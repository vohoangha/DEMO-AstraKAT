

import { GoogleGenAI } from "@google/genai";
import { MediaType, ArchitectureStyle, ImageQuality, RenderEngine, LightingSetting } from "../types";

// Helper function to get specific prompt details for each graphic design type
const getDesignContext = (type: MediaType): string => {
  switch (type) {
    case MediaType.STANDARD:
      return "General Creative Design. Follow the user's prompt and reference images strictly. Do not impose a specific layout format unless explicitly requested in the prompt. Focus on high-quality visual execution.";
    case MediaType.POSTER:
      return "Design a high-impact Movie or Event Poster. Focus on strong visual hierarchy, bold typography integration, cinematic lighting, and a compelling central composition that tells a story from a distance.";
    case MediaType.KEY_VISUAL:
      return "Create a professional Advertising Key Visual (KV). This should be a highly polished, commercial-grade image suitable for a brand campaign. Focus on product/concept highlight, perfect lighting, and premium detailing.";
    case MediaType.SOCIAL_POST:
      return "Design an engaging Social Media Post. The style should be trendy, scroll-stopping, and visually punchy. Use vibrant colors, clear focal points, and a modern aesthetic optimized for mobile screens (Instagram/TikTok style).";
    case MediaType.WALLPAPER:
      return "Create a stunning digital Wallpaper. Focus on aesthetics, atmosphere, and mood. The composition should be balanced but immersive, with less focus on text and more on artistic texture, landscape, or abstract beauty.";
    case MediaType.COVER_ART:
      return "Design creative Cover Art (Album/Book/Podcast). Use artistic expression, symbolic imagery, and emotive color palettes. The style can be abstract, illustrative, or photographic, but must look like a curated piece of art.";
    case MediaType.BANNER:
      return "Design a Web Banner. Focus on a horizontal layout with balanced negative space for potential text overlay. The imagery should be supportive and contextual rather than overwhelming, suitable for website headers or ad strips.";
    case MediaType.CARD:
      return "Design a Greeting Card or Invitation. The style should be tactile, warm, and inviting. Focus on paper textures, elegant motifs, illustration, or sophisticated minimalism suitable for print.";
    default:
      return "Professional high-quality graphic design asset with excellent composition and lighting.";
  }
};

// Helper function to get engine-specific characteristics
const getEngineCharacteristics = (engine: RenderEngine): string => {
  switch (engine) {
    case RenderEngine.BLENDER:
      return "Render Style: Mimic Blender Cycles. Unbiased path tracing, highly accurate global illumination, soft lighting falloff, physically based shading (BSDF), clean caustics, photorealistic depth of field.";
    case RenderEngine.CORONA:
      return "Render Style: Mimic Corona Renderer. Soft and realistic lighting, gentle light falloff, high-quality global illumination, warm and inviting atmosphere suitable for interiors.";
    case RenderEngine.D5:
      return "Render Style: Mimic D5 Render. Real-time ray tracing (RTX) look, sharp reflections, vibrant global illumination, modern architectural aesthetic, detailed atmospheric effects (DLSS style sharpness).";
    case RenderEngine.ENSCAPE:
      return "Render Style: Mimic Enscape. Real-time architectural visualization style, bright and airy lighting, clear definition of space, simplified but realistic material representation.";
    case RenderEngine.LUMION:
      return "Render Style: Mimic Lumion. Rich atmospheric effects, enhanced skies and vegetation, slight saturation boost, polished architectural presentation style.";
    case RenderEngine.MARMOSET:
      return "Render Style: Mimic Marmoset Toolbag. High-fidelity real-time PBR rendering, studio-style lighting setup, emphasis on material surface definition (roughness/metallic), crisp product-shot quality, omni-directional lighting.";
    case RenderEngine.MAXWELL:
      return "Render Style: Mimic Maxwell Render. Physically correct unbiased rendering, spectral lighting accuracy, film-like exposure, soft realistic shadows, photorealistic light simulation, high dynamic range.";
    case RenderEngine.OCTANE:
      return "Render Style: Mimic Octane Render. GPU-accelerated unbiased rendering, high contrast, spectral dispersion, sharp details, vibrant color depth.";
    case RenderEngine.REDSHIFT:
      return "Render Style: Mimic Redshift. Production-quality biased rendering, clean and noise-free, versatile lighting capability, sharp texture details.";
    case RenderEngine.TWINMOTION:
      return "Render Style: Mimic Twinmotion. Dynamic real-time lighting, high-quality vegetation, soft ambient occlusion, modern visualization look.";
    case RenderEngine.UNREAL:
      return "Render Style: Mimic Unreal Engine 5. Lumen global illumination, Nanite geometry detail, real-time photorealism, high dynamic range, cinematic post-processing effects.";
    case RenderEngine.VRAY:
      return "Render Style: Mimic V-Ray. Industry-standard photorealism, perfect light bounce calculation, accurate material reflection/refraction, crisp and balanced output.";
    default:
      return "Render Style: Professional photorealistic architectural visualization.";
  }
};

// Helper function for specific lighting descriptions
const getLightingDescription = (lighting: LightingSetting): string => {
  switch (lighting) {
    // Time of Day
    case LightingSetting.SUNRISE:
      return "Lighting: Sunrise. Soft, warm morning light, long shadows, pastel sky colors, fresh atmosphere.";
    case LightingSetting.SUNNY_DAY:
      return "Lighting: Sunny Day. Bright natural daylight, clear blue sky, sharp shadows, high contrast, energetic vibe.";
    case LightingSetting.NOON:
      return "Lighting: Noon. Direct overhead sunlight, harsh shadows, bright neutral white balance, maximum visibility.";
    case LightingSetting.GOLDEN_HOUR:
      return "Lighting: Golden Hour. Warm golden light, low sun angle, soft diffused shadows, magical and romantic atmosphere.";
    case LightingSetting.BLUE_HOUR:
      return "Lighting: Blue Hour. Deep blue twilight sky, mix of cold natural light and warm artificial city lights, serene mood.";
    case LightingSetting.NIGHT:
      return "Lighting: Night. Dark night sky, dramatic artificial lighting, high contrast, mysterious mood, emphasis on light sources.";
    
    // Weather & Environment
    case LightingSetting.OVERCAST:
      return "Lighting: Overcast. Soft diffused light from a giant softbox (the cloud layer), no hard shadows, even exposure, neutral tones.";
    case LightingSetting.RAINY:
      return "Lighting: Rainy. Wet surfaces with reflections, moody grey atmosphere, soft overcast light, rain droplets visible.";
    case LightingSetting.SNOWY:
      return "Lighting: Snowy. Bright white ambient light reflecting off snow, soft contrast, cold tones, winter atmosphere.";
    case LightingSetting.FOGGY:
      return "Lighting: Foggy/Misty. Low visibility, atmospheric depth, soft volumetric light rays, mysterious and ethereal.";

    // Artificial & Indoor
    case LightingSetting.WARM_INTERIOR:
      return "Lighting: Warm Interior. Cozy artificial lighting, tungsten (2700K-3000K) color temperature, inviting and comfortable atmosphere.";
    case LightingSetting.STUDIO:
      return "Lighting: Studio. Professional studio lighting setup, 3-point lighting, controlled shadows, softbox diffusion, clean look.";
    case LightingSetting.NEON:
      return "Lighting: Neon/Cyberpunk. Vibrant neon colors (pink, blue, purple), high contrast, dark background, glowing elements, futuristic vibe.";

    // Mood & Artistic
    case LightingSetting.CINEMATIC:
      return "Lighting: Cinematic. Dramatic lighting, high dynamic range, film look, carefully placed highlights and shadows to guide the eye.";
    case LightingSetting.MOODY:
      return "Lighting: Moody. Low key lighting, strong shadows, limited light sources, emotional and dramatic atmosphere.";
    case LightingSetting.BIOLUMINESCENT:
      return "Lighting: Bioluminescent. Glowing organic light sources, ethereal colors (blues/greens) in a dark environment, magical forest vibe.";

    default:
      return "Lighting: Balanced, professional architectural lighting enhancing the volume and materials.";
  }
};

// Helper to extract clean base64 and mimeType
const parseBase64Image = (dataUrl: string) => {
  if (dataUrl.includes(';base64,')) {
    const [metadata, base64] = dataUrl.split(';base64,');
    const mimeType = metadata.split(':')[1];
    return { mimeType, data: base64 };
  }
  // Fallback for raw base64 or comma separated without type
  const data = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
  
  // Try to detect mime type from header bytes if possible, otherwise default to png
  let mimeType = 'image/png';
  if (data.charAt(0) === '/') mimeType = 'image/jpeg';
  else if (data.charAt(0) === 'i') mimeType = 'image/png';
  else if (data.charAt(0) === 'U') mimeType = 'image/webp';
  
  return { mimeType, data };
};

// Helper for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get ALL available API Keys
const getApiKeys = (): string[] => {
  const keys: string[] = [];

  // Helper to safely get env vars from Vite or Process
  const getEnv = (key: string) => {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
        return (import.meta as any).env[key] || '';
    }
    if (typeof process !== 'undefined' && process.env) {
        return process.env[key] || process.env[key.replace('VITE_', '')] || '';
    }
    return '';
  };

  const k1 = getEnv('VITE_API_KEY');
  const k2 = getEnv('VITE_API_KEY_2');
  const k3 = getEnv('VITE_API_KEY_3');

  if (k1) keys.push(k1.trim());
  if (k2) keys.push(k2.trim());
  if (k3) keys.push(k3.trim());

  return keys;
};

export const generateCreativeAsset = async (
  prompt: string, 
  type: MediaType,
  aspectRatio: string,
  count: number = 1,
  inputImages: string[] = [], 
  referenceImages: string[] = [], 
  archStyle: ArchitectureStyle = ArchitectureStyle.NONE,
  quality: ImageQuality = ImageQuality.AUTO,
  renderEngine: RenderEngine = RenderEngine.DEFAULT,
  lighting: LightingSetting = LightingSetting.DEFAULT,
  signal?: AbortSignal,
  onImageReady?: (url: string, index: number) => void // callback for incremental loading
): Promise<string[]> => {
  
  const apiKeys = getApiKeys();
  if (apiKeys.length === 0) throw new Error("API Key missing. Please check your Vercel Environment Variables (VITE_API_KEY, VITE_API_KEY_2, etc).");
  
  const hasInput = inputImages.length > 0;
  const hasRef = referenceImages.length > 0;

  // --- MODEL & QUALITY SELECTION LOGIC ---
  
  let effectiveQuality = quality;
  
  // RULE: Default to STANDARD (Flash) if AUTO is selected
  // This ensures 2.5 Flash is used for basic generation unless user explicitly picks HD/2K/4K
  if (effectiveQuality === ImageQuality.AUTO) {
      effectiveQuality = ImageQuality.STANDARD;
  }

  // Model Selection
  // gemini-2.5-flash-image: Fast, Standard Quality, Efficient (Standard/Auto)
  // gemini-3-pro-image-preview: High Fidelity, Nano Banana Pro (HD, 2K, 4K)
  let selectedModel = 'gemini-2.5-flash-image'; 
  let apiImageSize: string | undefined = undefined; 
  
  if (effectiveQuality === ImageQuality.STANDARD) {
      selectedModel = 'gemini-2.5-flash-image';
      apiImageSize = undefined; // Flash does not support imageSize
  } else {
      // For HD, 2K, 4K -> Use Nano Banana Pro (Gemini 3 Pro Image)
      selectedModel = 'gemini-3-pro-image-preview';
      
      switch (effectiveQuality) {
          case ImageQuality.HD:
              apiImageSize = '1K'; // 3-Pro min is 1K, covers HD well
              break;
          case ImageQuality.Q2K:
              apiImageSize = '2K';
              break;
          case ImageQuality.Q4K:
              apiImageSize = '4K';
              break;
          default:
              apiImageSize = '1K';
      }
  }

  // Quality Instruction Prompting
  let qualityInstruction = "";
  if (effectiveQuality !== ImageQuality.STANDARD) {
    qualityInstruction = `Resolution Requirement: Render strictly in ${effectiveQuality} resolution. Detailed textures, sharp edges, high fidelity, photorealistic lighting.`;
  }

  // Construct precise instructions based on image availability
  let imageInstruction = "";
  if (hasInput && hasRef) {
    imageInstruction = `
    I have provided ${inputImages.length + referenceImages.length} images.
    - The FIRST ${inputImages.length} image(s) are the INPUT/SUBJECT (geometry, composition, or main product).
    - The NEXT ${referenceImages.length} image(s) are STYLE REFERENCES (colors, materials, lighting, vibe).
    TASK: Transform the INPUT images to match the style of the REFERENCE images.
    `;
  } else if (hasInput) {
    imageInstruction = `
    I have provided ${inputImages.length} image(s) as the INPUT/SUBJECT.
    TASK: Edit, refine, or render these specific input images based on the text prompt.
    `;
  } else if (hasRef) {
    imageInstruction = `
    I have provided ${referenceImages.length} image(s) as STYLE REFERENCES.
    TASK: Create a new design from scratch that strictly mimics the aesthetic/style of these references.
    `;
  }

  let enhancedPrompt = '';
  if (archStyle !== ArchitectureStyle.NONE) {
    // Architecture Render Mode
    // Handle 'Others' by relying on user note instead of applying a specific style string
    const styleGoal = archStyle === ArchitectureStyle.OTHERS 
        ? "custom architectural style based on User Note" 
        : `${archStyle} style`;
    
    const styleDetails = archStyle === ArchitectureStyle.OTHERS
        ? "Follow the User Note strictly for architectural aesthetics"
        : `Apply ${archStyle} aesthetics`;

    // Engine & Lighting Instructions
    const engineInstruction = renderEngine !== RenderEngine.DEFAULT 
        ? getEngineCharacteristics(renderEngine)
        : "Render Style: Professional photorealistic architectural visualization.";

    const lightingInstruction = lighting !== LightingSetting.DEFAULT 
        ? getLightingDescription(lighting)
        : "Lighting: Balanced, professional architectural lighting enhancing the volume and materials.";

    enhancedPrompt = `
    Task: Professional Architectural Visualization (Landscape & Exterior Test).
    
    CRITICAL RULES FOR INPUT FIDELITY:
    1. GEOMETRY LOCK: The input image geometry is the GROUND TRUTH. You must NOT alter the shapes, dimensions, perspective, or structural details of the buildings/landscape in the input.
    2. STYLE APPLICATION: Apply the requested style (${styleGoal}) strictly as a "skin" or "render layer" over the existing geometry. Change materials, lighting, and vegetation textures, but keep the underlying forms identical.
    3. DETAILS: Preserve all architectural details (window placements, roof lines, pathway shapes) exactly as they appear in the input.
    4. UNLESS REQUESTED: Do not add or remove structural elements unless explicitly asked in the User Note.
    
    ${imageInstruction}
    
    Goal: Create a high-fidelity render of the provided scene in ${styleGoal}.
    Style Details: ${styleDetails}. High-end material texturing, realistic lighting, ray-tracing quality.
    ${engineInstruction}
    ${lightingInstruction}
    User Note: ${prompt}.
    ${qualityInstruction}
    Composition: Ensure the output fits a ${aspectRatio} aspect ratio.
    `;
  } else {
    // Graphic Design Mode (Standard or Specific)
    const designContext = getDesignContext(type);
    
    // We use the original 'quality' prop for the text prompt description to distinguish "Professional Grade" (Auto) vs specific levels
    const qualityDesc = quality === ImageQuality.AUTO ? 'Professional Grade' : effectiveQuality;

    if (type === MediaType.STANDARD) {
        enhancedPrompt = `
        Task: Creative Image Generation / Manipulation.
        ${imageInstruction}
        User Prompt: ${prompt}.
        Direction: ${designContext}
        Quality Requirements: ${qualityDesc}, highly detailed, visually coherent.
        ${qualityInstruction}
        Composition: Ensure the output fits a ${aspectRatio} aspect ratio.
        `;
    } else {
        enhancedPrompt = `
        Task: Creative Graphic Design Generation.
        Format & Type: ${type}.
        ${imageInstruction}
        User Prompt: ${prompt}.
        Design Direction: ${designContext}
        Quality Requirements: ${qualityDesc}, professional composition, highly detailed, visually coherent.
        ${qualityInstruction}
        Composition: Ensure the output fits a ${aspectRatio} aspect ratio perfectly.
        `;
    }
  }

  const parts: any[] = [];

  // Pushing images in strict order: INPUTS first, then REFERENCES
  const allImages = [...inputImages, ...referenceImages];

  allImages.forEach((img) => {
    const { mimeType, data } = parseBase64Image(img);
    parts.push({
      inlineData: {
        data: data,
        mimeType: mimeType, 
      }
    });
  });

  parts.push({ text: enhancedPrompt });

  const safetySettings = [
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
  ];

  // Helper to generate a single image with KEY ROTATION and RETRY logic
  const generateSingleImage = async (index: number): Promise<string> => {
    let keyIndex = 0;
    
    // Outer loop: Try each API key available (Failover Logic)
    while (keyIndex < apiKeys.length) {
        const currentKey = apiKeys[keyIndex];
        const ai = new GoogleGenAI({ apiKey: currentKey });
        
        let attempt = 0;
        // Inner loop: Retry on current key for transient network issues
        const maxRetriesPerKey = 2; 

        while (attempt < maxRetriesPerKey) {
            if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

            try {
                // Construct config conditionally based on model capabilities
                const config: any = {
                    imageConfig: {
                        aspectRatio: aspectRatio,
                    },
                    safetySettings: safetySettings as any,
                };

                // Only add imageSize if NOT using Flash (Flash doesn't support it)
                if (apiImageSize && selectedModel !== 'gemini-2.5-flash-image') {
                    config.imageConfig.imageSize = apiImageSize;
                }

                const response = await ai.models.generateContent({
                    model: selectedModel,
                    contents: { parts: parts },
                    config: config,
                });

                if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
            
                if (response.candidates && response.candidates[0]) {
                    const candidate = response.candidates[0];
                    if (candidate.finishReason === 'SAFETY') {
                        // Safety errors should not rotate keys, as the content is the issue
                        throw new Error("Image generation blocked by Safety Filters. Please try a different prompt.");
                    }
                    if (candidate.content && candidate.content.parts) {
                        for (const part of candidate.content.parts) {
                            if (part.inlineData) {
                                const base64EncodeString: string = part.inlineData.data;
                                const finalUrl = `data:image/png;base64,${base64EncodeString}`;
                                if (onImageReady) onImageReady(finalUrl, index);
                                return finalUrl;
                            }
                        }
                    }
                }
                // If we got a 200 OK but no image
                throw new Error("No image data returned from model.");

            } catch (error: any) {
                if (signal?.aborted || error.name === 'AbortError') throw error;
                if (error.message && error.message.includes('Safety Filters')) throw error;

                // Check for Quota/Overload errors (Failover triggers)
                const isQuotaError = error.status === 429 || (error.message && error.message.includes('429'));
                const isOverloadError = error.status === 503 || error.code === 503 || (error.message && (error.message.includes('503') || error.message.includes('Overloaded')));

                if (isQuotaError || isOverloadError) {
                    // console.warn(`[ASTRA] Key ...${currentKey.slice(-4)} failed (Quota/Overload). Switching to next key...`);
                    // Break inner loop to try next key in outer loop
                    break; 
                }

                // If it's another type of error (like network glitch), retry same key
                if (attempt < maxRetriesPerKey - 1) {
                    await delay(1000 * (attempt + 1));
                    attempt++;
                    continue;
                } else {
                    // After max retries on this key, if it's not a quota error, we might still want to try next key just in case
                    // console.warn(`[ASTRA] Error on key ...${currentKey.slice(-4)}: ${error.message}`);
                    break; // Break inner, go to next key
                }
            }
        }
        
        // Move to next key
        keyIndex++;
    }

    throw new Error("Failed to generate image. All API keys exhausted or servers are busy.");
  };

  // Execute requests in parallel
  const promises = Array.from({ length: count }, (_, i) => generateSingleImage(i));
  return Promise.all(promises);
};

// --- NEW EDIT/INPAINTING FUNCTION ---
export const editCreativeAsset = async (
  originalImageUrl: string,
  maskImageUrl: string | null,
  prompt: string,
  quality: ImageQuality = ImageQuality.AUTO, // Added argument to support quality selection
  signal?: AbortSignal, // Added Signal for Stop
  referenceImages: string[] = [] // Added Reference Images for Editing
): Promise<string> => {
  const keys = getApiKeys();
  const apiKey = keys[0];
  if (!apiKey) throw new Error("API Key missing");

  // --- MODEL & QUALITY SELECTION LOGIC ---
  let effectiveQuality = quality;
  
  // FORCE GEMINI 3 PRO FOR EDITING
  // Flash model is often too weak for complex inpainting. 
  // We default to Pro for all edit tasks.
  let selectedModel = 'gemini-3-pro-image-preview'; 
  
  // Default to 2K (High Quality) even if AUTO is selected to ensure sharpness
  let apiImageSize = '2K'; 
  
  // Map specific qualities if requested
  if (effectiveQuality === ImageQuality.Q4K) {
      apiImageSize = '4K';
  } else if (effectiveQuality === ImageQuality.Q2K) {
      apiImageSize = '2K';
  } else if (effectiveQuality === ImageQuality.HD || effectiveQuality === ImageQuality.STANDARD) {
      apiImageSize = '1K';
  } else {
      // AUTO -> 2K (Upgrade from 1K default to ensure highest quality)
      apiImageSize = '2K';
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const parts: any[] = [];
  
  // 1. Original Image
  const { mimeType: orgMime, data: orgData } = parseBase64Image(originalImageUrl);
  parts.push({
      inlineData: {
          mimeType: orgMime,
          data: orgData
      }
  });

  // 2. Mask Image (If provided) - Passed as a second image
  if (maskImageUrl) {
     const { mimeType: maskMime, data: maskData } = parseBase64Image(maskImageUrl);
     parts.push({
         inlineData: {
             mimeType: maskMime,
             data: maskData
         }
     });
  }

  // 3. Reference Images (If provided) - Passed as subsequent images
  if (referenceImages && referenceImages.length > 0) {
    referenceImages.forEach(refImg => {
        const { mimeType: refMime, data: refData } = parseBase64Image(refImg);
        parts.push({
            inlineData: {
                mimeType: refMime,
                data: refData
            }
        });
    });
  }

  // 4. Prompt & Instructions
  let refInstruction = "";
  if (referenceImages && referenceImages.length > 0) {
      refInstruction = `
      I have also provided ${referenceImages.length} additional reference image(s). 
      Use these reference images to guide the style, texture, content, or object appearance of the edited area.
      `;
  }

  // Updated Prompt to prevent geometric shape bias from the mask
  const textPrompt = `
  Task: High Quality Image Editing / Inpainting.
  Input:
  1. The first image is the original.
  2. The second image is a black-and-white MASK (White = Area to edit, Black = Protect).
  ${referenceImages.length > 0 ? `3. Subsequent images are Style/Content References.` : ''}
  
  Instruction: Edit the content inside the white area of the mask based on this prompt: "${prompt}".
  ${refInstruction}

  CRITICAL INPAINTING RULES:
  - The white mask defines the EDITABLE REGION, NOT the shape of the object.
  - IGNORE the geometric shape (rectangle/circle) of the white mask. 
  - Do NOT generate a rectangular or circular object just because the mask is that shape. 
  - The generated object must have its natural organic shape and silhouette.
  - Seamlessly blend with the original surroundings (lighting, perspective, shadows).
  - Ensure ultra-sharp details, no blurriness.
  `;
  
  parts.push({ text: textPrompt });

  try {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

      const config: any = {};
      // 3-Pro model requires imageSize in many cases or defaults safely, but we explicitly set it.
      config.imageConfig = { imageSize: apiImageSize };

      const response = await ai.models.generateContent({
          model: selectedModel,
          contents: { parts: parts },
          config: config
      });

      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

      if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
          for (const part of response.candidates[0].content.parts) {
              if (part.inlineData) {
                  return `data:image/png;base64,${part.inlineData.data}`;
              }
          }
      }
      throw new Error("No edited image returned.");
  } catch (e: any) {
      if (signal?.aborted || e.name === 'AbortError') {
          throw e; // Re-throw abort to be handled by UI
      }
      console.error("Edit Error:", e);
      throw new Error(`Edit failed: ${e.message}`);
  }
};

export const generatePromptFromImage = async (
  images: string[],
  type: MediaType,
  archStyle: ArchitectureStyle = ArchitectureStyle.NONE,
  renderEngine: RenderEngine = RenderEngine.DEFAULT,
  lighting: LightingSetting = LightingSetting.DEFAULT
): Promise<string> => {
  const keys = getApiKeys();
  const apiKey = keys[0]; // Use first key for text tasks
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  const parts: any[] = [];

  images.forEach((img) => {
    const { mimeType, data } = parseBase64Image(img);
    parts.push({
      inlineData: {
        mimeType: mimeType,
        data: data
      }
    });
  });

  let promptRequest = '';

  if (archStyle !== ArchitectureStyle.NONE) {
    const styleText = archStyle === ArchitectureStyle.OTHERS ? "custom" : `"${archStyle}"`;
    let engineText = "";
    if (renderEngine !== RenderEngine.DEFAULT) engineText = `Simulate the rendering style of ${renderEngine}.`;
    
    let lightingText = "";
    if (lighting !== LightingSetting.DEFAULT) {
        lightingText = `The lighting should be ${getLightingDescription(lighting)}.`;
    }

    promptRequest = `
      You are an expert Architectural Consultant. 
      Analyze the provided ${images.length} image(s) as a reference for geometry, layout, or atmosphere.
      The user wants to create a Photorealistic Architectural Render in the ${styleText} style.
      ${engineText}
      ${lightingText}
      Write a precise, professional prompt (approx 40-60 words) describing the scene, materials, lighting, and furniture.
      Return ONLY the prompt text.
    `;
  } else {
    promptRequest = `
      You are a Creative Director. 
      Analyze the provided ${images.length} image(s). 
      The user wants to use these as reference to create a "${type}". 
      Write a creative, detailed, and artistic prompt (approx 40-60 words) that describes how to transform these references.
      Return ONLY the prompt text.
    `;
  }

  parts.push({ text: promptRequest });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: parts }
  });

  return response.text || "";
};

export const enhanceUserPrompt = async (
  currentPrompt: string,
  type: MediaType,
  archStyle: ArchitectureStyle,
  renderEngine: RenderEngine = RenderEngine.DEFAULT,
  lighting: LightingSetting = LightingSetting.DEFAULT
): Promise<string> => {
  const keys = getApiKeys();
  const apiKey = keys[0]; // Use first key for text tasks
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  let instruction = '';
  if (archStyle !== ArchitectureStyle.NONE) {
    const context = archStyle === ArchitectureStyle.OTHERS ? "architectural render" : `${archStyle} style render`;
    const engineText = renderEngine !== RenderEngine.DEFAULT ? `, rendered in ${renderEngine}` : '';
    const lightingText = lighting !== LightingSetting.DEFAULT ? `, with ${getLightingDescription(lighting)}` : '';

    instruction = `
      You are a specialized Architectural Visualization Prompt Engineer.
      Improve the user's prompt: "${currentPrompt}".
      Context: Creating a ${context}${engineText}${lightingText}.
      Task: Expand the prompt to include details about lighting, materials, and atmosphere. 
      Keep it concise (under 80 words). Output ONLY the improved prompt.
    `;
  } else {
     instruction = `
      You are a Creative Design Prompt Expert.
      Improve the user's prompt: "${currentPrompt}".
      Context: Creating a ${type}.
      Task: Expand the prompt to add professional design keywords, lighting description, and compositional details.
      Keep it concise (under 80 words). Output ONLY the improved prompt.
    `;
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: instruction
  });

  return response.text || currentPrompt;
};
