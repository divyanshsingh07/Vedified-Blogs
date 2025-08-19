import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Check if API key is available
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables');
} else {
  console.log('✅ GEMINI_API_KEY is configured');
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Fallback content generation function
const generateFallbackContent = (title, category, subtitle = '') => {
  return `
    <h2>Introduction</h2>
    <p>Welcome to our comprehensive guide on <strong>${title}</strong>. In today's rapidly evolving world, understanding ${category.toLowerCase()} concepts has become increasingly important for both personal and professional growth.</p>
    
    <h2>What is ${title}?</h2>
    <p>${title} represents a fundamental aspect of ${category.toLowerCase()} that has evolved significantly over the years. It encompasses various elements that work together to create meaningful experiences and drive innovation in the field.</p>
    
    <h3>Key Components</h3>
    <ul>
      <li><strong>Core Principles:</strong> Understanding the fundamental concepts that drive ${title}</li>
      <li><strong>Practical Applications:</strong> Real-world examples and use cases</li>
      <li><strong>Best Practices:</strong> Proven strategies for success</li>
      <li><strong>Future Trends:</strong> What's coming next in this space</li>
    </ul>
    
    <h2>Why ${title} Matters</h2>
    <p>The significance of ${title} cannot be overstated in today's ${category.toLowerCase()} landscape. It serves as a foundation for innovation and provides a framework for solving complex challenges.</p>
    
    <h3>Benefits and Advantages</h3>
    <p>Implementing ${title} strategies can lead to numerous benefits, including improved efficiency, enhanced user experience, and competitive advantages in the market.</p>
    
    <h2>Getting Started</h2>
    <p>To begin your journey with ${title}, start by understanding the basic concepts and gradually build your knowledge through practical application and continuous learning.</p>
    
    <h3>Next Steps</h3>
    <ul>
      <li>Research current trends in ${category.toLowerCase()}</li>
      <li>Identify specific areas for improvement</li>
      <li>Develop a learning plan</li>
      <li>Start with small, manageable projects</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>${title} represents an exciting opportunity to explore and innovate within the ${category.toLowerCase()} domain. By understanding its principles and applying them thoughtfully, you can unlock new possibilities and drive meaningful change.</p>
    
    <p>Remember, success with ${title} comes from continuous learning, practical application, and staying updated with the latest developments in the field.</p>
  `;
};

// Function to generate blog content
export const generateBlogContent = async (title, category, subtitle = '') => {
  try {
    console.log('🤖 Starting Gemini AI content generation...');
    console.log('📝 Input:', { title, category, subtitle });
    
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.log('⚠️ No API key, using fallback content generation');
      return generateFallbackContent(title, category, subtitle);
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Write a detailed blog post about "${title}" in the ${category} category. 
    
    Requirements:
    - Write in HTML format with proper tags
    - Include an engaging introduction
    - Add 3-4 main sections with headings (h2, h3)
    - Use paragraphs, bullet points, and formatting
    - Make it informative and engaging
    - Include practical tips or insights
    - Write 500-800 words
    - Use proper HTML structure with <p>, <h2>, <h3>, <ul>, <li> tags
    
    Start with: <h2>Introduction</h2>
    
    ${subtitle ? `Subtitle: ${subtitle}` : ''}`;

    console.log('📤 Sending prompt to Gemini AI...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    console.log('✅ Gemini AI content generated successfully');
    console.log('📊 Content length:', content.length, 'characters');
    
    return content;
  } catch (error) {
    console.error('❌ Gemini AI error:', error);
    console.log('🔄 Falling back to template content generation');
    
    // Return fallback content if AI fails
    return generateFallbackContent(title, category, subtitle);
  }
};

export default generateBlogContent;