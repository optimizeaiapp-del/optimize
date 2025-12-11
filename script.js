// ====== SLIDER LABEL HANDLING ======
const strengthInput = document.getElementById("rewriteStrength");
const strengthLabel = document.getElementById("strengthLabel");

function getStrengthDescription(level) {
  const numLevel = parseFloat(level);
  const currentLang = localStorage.getItem('selectedLanguage') || 'en';
  const getTrans = (key) => {
    if (typeof getTranslation === 'function') {
      return getTranslation(key, currentLang);
    }
    const fallbacks = { 'light': 'Light', 'balanced': 'Balanced', 'max': 'Max' };
    return fallbacks[key] || key;
  };
  
  if (numLevel <= 1.5) {
    return {
      name: getTrans('light'),
      description:
        "Light touch – keep most wording, just fix clarity, grammar, and structure."
    };
  }
  if (numLevel >= 2.5) {
    return {
      name: getTrans('max'),
      description:
        "Heavy rewrite – free to rephrase aggressively as long as the ideas stay accurate."
    };
  }
  return {
    name: getTrans('balanced'),
    description:
      "Medium changes – improve clarity, flow, and structure while keeping the student's voice."
  };
}

// update text when slider moves
if (strengthInput && strengthLabel) {
  strengthInput.addEventListener("input", () => {
    const info = getStrengthDescription(strengthInput.value);
    strengthLabel.textContent = info.name;
  });
}

// ====== STATE MANAGEMENT ======
let currentAnalysisType = null; // 'analyze' or 'rewrite'
let currentContext = null; // Stores teacher, instructions, draft, strength
let uploadedImages = {
  instructions: null,
  draft: null
}; // Store base64 image data

// ====== TEXT FORMATTING ======
function formatAnalysisText(text) {
  if (!text) return text;
  
  // Remove markdown symbols and convert to HTML
  let formatted = text
    // Remove hashtags (#) from headers
    .replace(/^#+\s*(.+)$/gm, '<h3>$1</h3>')
    // Remove asterisks from bold (**text** or *text*)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
    // Remove underscores from bold/italic
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    // Convert numbered lists (1. item)
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    // Convert bullet points (- item or * item)
    .replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>')
    // Clean up multiple newlines
    .replace(/\n{3,}/g, '\n\n');
  
  // Wrap consecutive <li> tags in <ul>
  formatted = formatted.replace(/(<li>.*?<\/li>(?:\s*<li>.*?<\/li>)*)/gs, '<ul>$1</ul>');
  
  // Wrap paragraphs (text between headers/lists)
  const lines = formatted.split('\n');
  let result = [];
  let currentParagraph = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      if (currentParagraph.length > 0) {
        result.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
      }
      continue;
    }
    
    // If it's already HTML (h3, ul, li), add it directly
    if (line.startsWith('<h3>') || line.startsWith('<ul>') || line.startsWith('<li>') || line.startsWith('</ul>')) {
      if (currentParagraph.length > 0) {
        result.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
      }
      result.push(line);
    } else {
      currentParagraph.push(line);
    }
  }
  
  if (currentParagraph.length > 0) {
    result.push('<p>' + currentParagraph.join(' ') + '</p>');
  }
  
  return result.join('\n');
}

// ====== API CALL ======
// Calls the backend server which securely handles OpenAI API requests
async function callOpenAI(prompt, feedback = null, previousResult = null, images = null, teacherName = null, isRewrite = false) {
  const output = document.getElementById("output");
  output.classList.remove("placeholder");
  
  // Get current language and translations
  const currentLang = localStorage.getItem('selectedLanguage') || 'en';
  const getTrans = (key) => {
    if (typeof getTranslation === 'function') {
      return getTranslation(key, currentLang);
    }
    // Fallback translations
    const fallbacks = {
      'rewritingBetter': 'Rewriting a better version',
      'gradingWork': 'is grading your work',
      'thinking': 'Thinking'
    };
    return fallbacks[key] || key;
  };
  
  // Show personalized thinking message
  if (isRewrite) {
    const msg = getTrans('rewritingBetter');
    output.innerHTML = `<p class="loading-message" style="text-align: center; font-weight: 600; color: var(--color-primary); margin: 20px 0;">${msg}<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span></p>`;
  } else if (teacherName) {
    const msg = getTrans('gradingWork');
    output.innerHTML = `<p class="loading-message" style="text-align: center; font-weight: 600; color: var(--color-primary); margin: 20px 0;">${teacherName} ${msg}<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span></p>`;
  } else {
    const msg = getTrans('thinking');
    output.innerHTML = `<p class="loading-message">${msg}<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span></p>`;
  }

  try {
    // Use relative path for production (Vercel), absolute for local development
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000/api/analyze'
      : '/api/analyze';
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        prompt,
        feedback,
        previousResult,
        images // Send images for vision analysis
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "API error occurred");
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error:", error);
    return `Error: ${error.message}\n\nMake sure the backend server is running on port 3000 and your OpenAI API key is configured in the .env file.`;
  }
}

// ====== MAIN FUNCTIONS ======

async function analyze() {
  const teacherProfile = getTeacherProfile();
  const instructions = document.getElementById("instructions").value;
  const draft = document.getElementById("draft").value;
  const strength = document.getElementById("rewriteStrength").value;

  // Check if teacher profile is selected
  if (!teacherProfile) {
    const output = document.getElementById("output");
    output.classList.remove("placeholder");
    output.innerHTML = "<p>Please select a teacher from the dropdown.</p>";
    hideFeedbackSection();
    return;
  }
  
  const teacher = teacherProfile.fullProfile;
  const teacherName = teacherProfile.name;

  // Check if instructions are provided (either text or image)
  const hasInstructions = (instructions && instructions.trim()) || uploadedImages.instructions;
  if (!hasInstructions) {
    const output = document.getElementById("output");
    output.classList.remove("placeholder");
    output.innerHTML = "<p>Please provide Assignment Instructions / Rubric (text or upload a photo).</p>";
    hideFeedbackSection();
    return;
  }

  // Check if draft is provided (either text or image)
  const hasDraft = (draft && draft.trim()) || uploadedImages.draft;
  if (!hasDraft) {
    const output = document.getElementById("output");
    output.classList.remove("placeholder");
    output.innerHTML = "<p>Please provide Your Draft (text or upload a photo).</p>";
    hideFeedbackSection();
    return;
  }
  
  // Hide feedback section when starting new analysis
  hideFeedbackSection();

  const strengthInfo = getStrengthDescription(strength);
  
  // Prepare images for API
  const images = {};
  if (uploadedImages.instructions) images.instructions = uploadedImages.instructions;
  if (uploadedImages.draft) images.draft = uploadedImages.draft;
  
  // Calculate word count for text-based drafts
  const draftWordCount = draft ? draft.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
  const instructionsText = instructions ? instructions.trim() : '';
  
  // Extract word count requirement from instructions if mentioned
  let requiredWordCount = null;
  const wordCountMatch = instructionsText.match(/(\d+)\s*(?:words?|word\s*count)/i);
  if (wordCountMatch) {
    requiredWordCount = parseInt(wordCountMatch[1]);
  }
  
  // Build prompt - adjust based on whether images are present
  let prompt;
  if (Object.keys(images).length > 0) {
    prompt = `You are analyzing a student's assignment. The student has provided images of their work and/or rubric.

CRITICAL: You MUST grade exactly as this teacher would grade. Match their marking style precisely.

Teacher's Marking Style:
${teacher}

${instructions ? `Assignment Instructions / Rubric (text):\n${instructions}\n` : ''}
${draft ? `Student's Draft (text):\n${draft}\n` : ''}
${draftWordCount > 0 ? `\nWord count of draft: ${draftWordCount} words${requiredWordCount ? ` (Required: ${requiredWordCount} words)` : ''}` : ''}

${images.instructions ? 'An image of the assignment instructions/rubric has been provided. Analyze it visually.' : ''}
${images.draft ? 'An image of the student\'s work (artwork/project) has been provided. Analyze it visually as a complete visual piece.' : ''}

GRADING INSTRUCTIONS:
- You MUST grade exactly as this teacher would grade based on their marking style
- If the teacher is described as "very strict", "rarely gives high grades", or "hard marker", you MUST be correspondingly strict
- For strict markers: If the work is severely incomplete (e.g., only a few words when hundreds/thousands are required), the grade should be 0% or very close to 0%
- For strict markers: If minimum requirements are not met, do NOT give partial credit - give 0% or very low grades
- For lenient markers: You may be more generous, but still be realistic
- The grade MUST reflect the teacher's actual marking style - if they're strict, be strict; if they're lenient, be lenient
- Consider word count requirements: If a 1000-word essay is required and only a few words are submitted, strict markers would give 0%

Please provide:
1. A grade estimate (out of 100) - MUST match the teacher's marking style exactly
2. A breakdown of where marks would be lost
3. Specific feedback organized by:
   - Visual/Design elements (if artwork)
   - Adherence to rubric requirements
   - Quality and execution
   - Areas for improvement
4. Actionable suggestions for improvement

Analyze the images as complete visual works. Be specific, kind, and academically honest. Grade exactly as this teacher would grade.`;
  } else {
    prompt = `You are analyzing a student's assignment draft.

CRITICAL: You MUST grade exactly as this teacher would grade. Match their marking style precisely.

Teacher's Marking Style:
${teacher}

Assignment Instructions / Rubric:
${instructions}

Student's Draft:
${draft}
${draftWordCount > 0 ? `\nWord count of draft: ${draftWordCount} words${requiredWordCount ? ` (Required: ${requiredWordCount} words)` : ''}` : ''}

GRADING INSTRUCTIONS:
- You MUST grade exactly as this teacher would grade based on their marking style
- If the teacher is described as "very strict", "rarely gives high grades", or "hard marker", you MUST be correspondingly strict
- For strict markers: If the work is severely incomplete (e.g., only a few words when hundreds/thousands are required), the grade should be 0% or very close to 0%
- For strict markers: If minimum requirements are not met, do NOT give partial credit - give 0% or very low grades
- For lenient markers: You may be more generous, but still be realistic
- The grade MUST reflect the teacher's actual marking style - if they're strict, be strict; if they're lenient, be lenient
- Consider word count requirements: If a 1000-word essay is required and only a few words are submitted, strict markers would give 0%
- If the draft is essentially empty or just a few words when a substantial essay is required, strict markers would give 0%

Please provide:
1. A grade estimate (out of 100) - MUST match the teacher's marking style exactly
2. A breakdown of where marks would be lost
3. Specific feedback organized by:
   - Clarity issues
   - Evidence/Support issues
   - Structure issues
4. Actionable suggestions for improvement

Be specific, kind, and academically honest. Grade exactly as this teacher would grade.`;
  }

  // Store context for potential refinement
  currentAnalysisType = 'analyze';
  currentContext = { teacher, teacherName, instructions, draft, strength };

  const result = await callOpenAI(prompt, null, null, Object.keys(images).length > 0 ? images : null, teacherName);
  const formattedResult = formatAnalysisText(result);
  output.innerHTML = formattedResult;
  
  // Extract and display grade
  extractAndDisplayGrade(result);
  
  // Show feedback section after analysis
  showFeedbackSection();
}

async function rewriteOnly() {
  const teacherProfile = getTeacherProfile();
  const instructions = document.getElementById("instructions").value;
  const draft = document.getElementById("draft").value;
  const strength = document.getElementById("rewriteStrength").value;

  // Check if teacher profile is selected
  if (!teacherProfile) {
    const output = document.getElementById("output");
    output.classList.remove("placeholder");
    const teacherSelect = document.getElementById("teacherSelect");
    if (teacherSelect && teacherSelect.value === "other") {
      output.innerHTML = "<p>Please describe your teacher's marking style in the text field below.</p>";
    } else {
      output.innerHTML = "<p>Please select a teacher from the dropdown.</p>";
    }
    hideFeedbackSection();
    return;
  }
  
  const teacher = teacherProfile.fullProfile;
  const teacherName = teacherProfile.name;

  // Check if instructions are provided (either text or image)
  const hasInstructions = (instructions && instructions.trim()) || uploadedImages.instructions;
  if (!hasInstructions) {
    const output = document.getElementById("output");
    output.classList.remove("placeholder");
    output.innerHTML = "<p>Please provide Assignment Instructions / Rubric (text or upload a photo).</p>";
    hideFeedbackSection();
    return;
  }

  // Check if draft is provided (either text or image)
  const hasDraft = (draft && draft.trim()) || uploadedImages.draft;
  if (!hasDraft) {
    const output = document.getElementById("output");
    output.classList.remove("placeholder");
    output.innerHTML = "<p>Please provide Your Draft (text or upload a photo).</p>";
    hideFeedbackSection();
    return;
  }
  
  // Hide feedback section when starting new rewrite
  hideFeedbackSection();

  const strengthInfo = getStrengthDescription(strength);
  const format = document.getElementById("rewriteFormat").value;
  const formatCustom = document.getElementById("formatCustom") ? document.getElementById("formatCustom").value.trim() : "";
  
  // Get format instructions
  let formatInstruction = "";
  switch(format) {
    case "essay":
      formatInstruction = "Format the output as a well-structured essay with clear paragraphs, introduction, body paragraphs, and conclusion.";
      break;
    case "paragraph":
      formatInstruction = "Format the output as flowing paragraphs with smooth transitions between ideas.";
      break;
    case "bullets":
      formatInstruction = "Format the output as bullet points or a structured list with clear, concise points.";
      break;
    case "other":
      if (formatCustom) {
        formatInstruction = `Format the output as: ${formatCustom}`;
      } else {
        formatInstruction = "Use the most natural format that best suits the content and assignment requirements.";
      }
      break;
  }
  
  // Prepare images for API
  const images = {};
  if (uploadedImages.instructions) images.instructions = uploadedImages.instructions;
  if (uploadedImages.draft) images.draft = uploadedImages.draft;
  
  // Build prompt - adjust for visual projects
  let prompt;
  if (Object.keys(images).length > 0) {
    prompt = `The student has provided images of their work and/or rubric. Provide suggestions for improving their visual project.

Teacher's Marking Style:
${teacher}

${instructions ? `Assignment Instructions / Rubric (text):\n${instructions}\n` : ''}
${draft ? `Student's Notes (text):\n${draft}\n` : ''}

${images.instructions ? 'An image of the assignment instructions/rubric has been provided.' : ''}
${images.draft ? 'An image of the student\'s work (artwork/project) has been provided.' : ''}

Rewrite Strength: ${strengthInfo.name} - ${strengthInfo.description}
Output Format: ${formatInstruction}

Please provide detailed suggestions for improving the visual project that:
- Match the teacher's marking style
- Follow the assignment instructions/rubric
- Address visual elements, composition, and execution
- Provide specific, actionable improvements
${formatInstruction ? `- ${formatInstruction}` : ''}

Focus on visual improvements and how to better meet the rubric requirements.`;
  } else {
    prompt = `Rewrite this student's assignment draft to match their teacher's marking style.

Teacher's Marking Style:
${teacher}

Assignment Instructions / Rubric:
${instructions}

Student's Draft:
${draft}

Rewrite Strength: ${strengthInfo.name} - ${strengthInfo.description}
Output Format: ${formatInstruction}

Please provide a polished, rewritten version that:
- Matches the teacher's marking style
- Follows the assignment instructions
- Maintains the student's voice (especially for Light/Balanced)
- Improves clarity, structure, and evidence
- Is ready to submit
${formatInstruction ? `- ${formatInstruction}` : ''}

Output only the rewritten version, no additional commentary.`;
  }

  // Store context for potential refinement
  currentAnalysisType = 'rewrite';
  currentContext = { teacher, teacherName, instructions, draft, strength };

  const result = await callOpenAI(prompt, null, null, Object.keys(images).length > 0 ? images : null, teacherName, true);
  const output = document.getElementById("output");
  output.classList.remove("placeholder");
  const formattedResult = formatAnalysisText(result);
  output.innerHTML = formattedResult;
  
  // Show feedback section after rewrite
  showFeedbackSection();
}

// ====== GRADE FUNCTIONS ======

function extractAndDisplayGrade(analysisText) {
  // Try to extract grade from the analysis text (remove HTML tags first)
  const textOnly = analysisText.replace(/<[^>]*>/g, '');
  
  // Look for patterns like "85/100", "85 out of 100", "85%", "Grade: 85", etc.
  const gradePatterns = [
    /(\d+)\s*\/\s*100/i,
    /(\d+)\s+out\s+of\s+100/i,
    /grade[:\s]+(\d+)/i,
    /(\d+)%/i,
    /(\d+)\s*points?/i
  ];
  
  let grade = null;
  for (const pattern of gradePatterns) {
    const match = textOnly.match(pattern);
    if (match) {
      grade = parseInt(match[1]);
      if (grade >= 0 && grade <= 100) {
        break;
      }
    }
  }
  
  const gradeDisplay = document.getElementById("gradeDisplay");
  const gradePercentage = document.getElementById("gradePercentage");
  
  if (grade !== null) {
    gradePercentage.textContent = grade + "%";
    gradeDisplay.style.display = "block";
  } else {
    gradeDisplay.style.display = "none";
  }
}

function explainGrade() {
  // Simply scroll to the analysis output section
  const output = document.getElementById("output");
  if (output) {
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Add a slight highlight effect
    output.style.transition = 'box-shadow 0.3s ease';
    output.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.3)';
    setTimeout(() => {
      output.style.boxShadow = '';
    }, 1000);
  }
}

// ====== FEEDBACK FUNCTIONS ======

function showFeedbackSection() {
  const feedbackSection = document.getElementById("feedbackSection");
  if (feedbackSection) {
    feedbackSection.style.display = "block";
  }
}

function hideFeedbackSection() {
  const feedbackSection = document.getElementById("feedbackSection");
  if (feedbackSection) {
    feedbackSection.style.display = "none";
    document.getElementById("feedback").value = "";
  }
  // Also hide grade display when starting new analysis
  const gradeDisplay = document.getElementById("gradeDisplay");
  if (gradeDisplay) {
    gradeDisplay.style.display = "none";
  }
}

async function refineAnalysis() {
  const feedback = document.getElementById("feedback").value;
  
  if (!feedback || !feedback.trim()) {
    alert("Please provide feedback to refine the analysis.");
    return;
  }

  if (!currentContext) {
    alert("No previous analysis found. Please run an analysis first.");
    return;
  }

  const output = document.getElementById("output");
  const previousResult = output.textContent || output.innerText;
  const { teacher, teacherName, instructions, draft, strength } = currentContext;

  let prompt;
  if (currentAnalysisType === 'analyze') {
    prompt = `You previously analyzed a student's assignment draft. The student has provided feedback on your analysis. Please refine your analysis based on their feedback.

Teacher's Marking Style:
${teacher}

Assignment Instructions / Rubric:
${instructions}

Student's Draft:
${draft}

Previous Analysis:
${previousResult}

Student's Feedback:
${feedback}

Please provide an improved analysis that addresses the student's feedback while maintaining academic honesty and helpfulness.`;
  } else {
    const strengthInfo = getStrengthDescription(strength);
    prompt = `You previously rewrote a student's assignment. The student has provided feedback on your rewrite. Please refine the rewrite based on their feedback.

Teacher's Marking Style:
${teacher}

Assignment Instructions / Rubric:
${instructions}

Original Student's Draft:
${draft}

Previous Rewrite:
${previousResult}

Student's Feedback:
${feedback}

Rewrite Strength: ${strengthInfo.name} - ${strengthInfo.description}

Please provide an improved rewrite that addresses the student's feedback. Output only the rewritten version, no additional commentary.`;
  }

  const result = await callOpenAI(prompt, feedback, previousResult, null, teacherName, currentAnalysisType === 'rewrite');
  output.classList.remove("placeholder");
  const formattedResult = formatAnalysisText(result);
  output.innerHTML = formattedResult;
  
  // Extract and display grade if it's an analysis refinement (use original text)
  if (currentAnalysisType === 'analyze') {
    extractAndDisplayGrade(result);
  }
  
  // Clear feedback after refinement
  document.getElementById("feedback").value = "";
}

// ====== IMAGE UPLOAD FUNCTIONS ======

function handleImageUpload(section, file) {
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file.');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const previewDiv = document.getElementById(`${section}ImagePreview`);
    const previewImg = document.getElementById(`${section}Image`);
    
    if (previewDiv && previewImg) {
      previewImg.src = e.target.result;
      previewDiv.style.display = 'block';
      
      // Store base64 image data for API
      uploadedImages[section] = e.target.result; // base64 data URL
      
      // Show indicator that image will be analyzed with Vision API
      const textarea = document.getElementById(section);
      if (textarea && !textarea.value.trim()) {
        if (section === 'instructions') {
          textarea.placeholder = '✓ Image uploaded - will be analyzed with Vision API. You can also add text notes if needed.';
        } else {
          textarea.placeholder = '✓ Image uploaded - will be analyzed visually as artwork/project. You can also add text notes if needed.';
        }
      }
    }
  };
  
  reader.readAsDataURL(file);
}

function removeImage(section) {
  const previewDiv = document.getElementById(`${section}ImagePreview`);
  const fileInput = document.getElementById(`${section}File`);
  const textarea = document.getElementById(section);
  
  if (previewDiv) {
    previewDiv.style.display = 'none';
  }
  
  if (fileInput) {
    fileInput.value = '';
  }
  
  // Clear stored image
  uploadedImages[section] = null;
  
  // Reset placeholder
  if (textarea) {
    if (section === 'instructions') {
      textarea.placeholder = 'Paste the question, rubric, or assignment instructions here...';
    } else if (section === 'draft') {
      textarea.placeholder = 'Paste your assignment draft here...';
    }
  }
}

// ====== TEACHER SELECT HANDLING ======

document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Format selector handling
  const rewriteFormat = document.getElementById("rewriteFormat");
  const formatCustomSection = document.getElementById("formatCustomSection");
  
  if (rewriteFormat && formatCustomSection) {
    rewriteFormat.addEventListener("change", function() {
      formatCustomSection.style.display = this.value === "other" ? "block" : "none";
    });
  }
  
  // Custom dropdown functionality
  const customSelect = document.getElementById("teacherSelectCustom");
  const customTrigger = customSelect?.querySelector(".custom-select-trigger");
  const customOptions = document.getElementById("teacherSelectOptions");
  const hiddenSelect = document.getElementById("teacherSelect");
  const teacherNotesSection = document.getElementById("teacherNotesSection");
  const teacherCustomSection = document.getElementById("teacherCustomSection");
  
  if (customTrigger && customOptions && hiddenSelect) {
    // Toggle dropdown
    customTrigger.addEventListener("click", function(e) {
      e.stopPropagation();
      customSelect.classList.toggle("active");
      customOptions.classList.toggle("show");
    });
    
    // Handle option selection
    customOptions.querySelectorAll(".custom-option").forEach(option => {
      option.addEventListener("click", function() {
        const value = this.getAttribute("data-value");
        const name = this.getAttribute("data-name");
        const desc = this.getAttribute("data-desc");
        const initials = this.getAttribute("data-initials");
        
        // Update hidden select
        hiddenSelect.value = value;
        
        // Update trigger display
        const triggerContent = customTrigger.querySelector(".select-selected") || customTrigger.querySelector(".select-placeholder");
        if (value === "other") {
          triggerContent.className = "select-selected";
          triggerContent.innerHTML = `
            <div class="teacher-avatar teacher-avatar-other">+</div>
            <span>${name} - ${desc}</span>
          `;
        } else {
          // Map value to avatar class number
          const avatarMap = {
            'ms-frank': '1',
            'mr-chen': '2',
            'ms-patel': '3',
            'mr-thompson': '4',
            'ms-rodriguez': '5',
            'mr-kim': '6',
            'ms-williams': '7',
            'mr-davis': '8'
          };
          const avatarNum = avatarMap[value] || '1';
          triggerContent.className = "select-selected";
          triggerContent.innerHTML = `
            <div class="teacher-avatar teacher-avatar-${avatarNum}">${initials}</div>
            <span>${name} - ${desc}</span>
          `;
        }
        
        // Remove selected class from all options
        customOptions.querySelectorAll(".custom-option").forEach(opt => {
          opt.classList.remove("selected");
        });
        // Add selected class to chosen option
        this.classList.add("selected");
        
        // Close dropdown
        customSelect.classList.remove("active");
        customOptions.classList.remove("show");
        
        // Show/hide sections
        const isOther = value === "other";
        const hasSelection = value && value !== "";
        const isPresetTeacher = hasSelection && !isOther;
        
        if (teacherCustomSection) {
          teacherCustomSection.style.display = isOther ? "block" : "none";
        }
        
        // Only show notes section for preset teachers, not for "Other"
        if (teacherNotesSection) {
          teacherNotesSection.style.display = isPresetTeacher ? "block" : "none";
        }
        
        // Trigger change event on hidden select
        hiddenSelect.dispatchEvent(new Event("change"));
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener("click", function(e) {
      if (!customSelect.contains(e.target)) {
        customSelect.classList.remove("active");
        customOptions.classList.remove("show");
      }
    });
  }
  
  // Handle hidden select changes (for compatibility)
  if (hiddenSelect) {
    hiddenSelect.addEventListener("change", function() {
      const isOther = this.value === "other";
      const hasSelection = this.value && this.value !== "";
      const isPresetTeacher = hasSelection && !isOther;
      
      if (teacherCustomSection) {
        teacherCustomSection.style.display = isOther ? "block" : "none";
      }
      
      // Only show notes section for preset teachers, not for "Other"
      if (teacherNotesSection) {
        teacherNotesSection.style.display = isPresetTeacher ? "block" : "none";
      }
    });
  }
});

function getTeacherProfile() {
  const teacherSelect = document.getElementById("teacherSelect");
  const teacherNotes = document.getElementById("teacherNotes");
  const teacherCustom = document.getElementById("teacherCustom");
  const teacherCustomName = document.getElementById("teacherCustomName");
  
  if (!teacherSelect || !teacherSelect.value) {
    return null;
  }
  
  const selectedOption = teacherSelect.options[teacherSelect.selectedIndex];
  const isOther = teacherSelect.value === "other";
  
  // For "Other" option, use custom description
  if (isOther) {
    const customDesc = teacherCustom ? teacherCustom.value.trim() : "";
    if (!customDesc) {
      return null; // Require custom description for "Other"
    }
    
    const customName = teacherCustomName ? teacherCustomName.value.trim() : "";
    const teacherName = customName || "Your Teacher";
    
    const notes = teacherNotes ? teacherNotes.value.trim() : "";
    let profile = `${teacherName}: ${customDesc}`;
    if (notes) {
      profile += `\n\nAdditional notes: ${notes}`;
    }
    
    return {
      name: teacherName,
      description: customDesc,
      notes: notes,
      fullProfile: profile
    };
  }
  
  // For preset teachers
  const teacherName = selectedOption.getAttribute("data-name");
  const teacherDesc = selectedOption.getAttribute("data-desc");
  const notes = teacherNotes ? teacherNotes.value.trim() : "";
  
  let profile = `${teacherName}: ${teacherDesc}`;
  if (notes) {
    profile += `\n\nAdditional notes: ${notes}`;
  }
  
  return {
    name: teacherName,
    description: teacherDesc,
    notes: notes,
    fullProfile: profile
  };
}

// ====== SCROLL FUNCTIONS ======

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ====== MODAL FUNCTIONS ======

function showModal(title, text) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  
  if (modal && modalTitle && modalText) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Restore scrolling
  }
}

// Close modal on Escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
