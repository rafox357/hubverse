import React from 'react';

interface FigmaEmbedProps {
  title?: string;
  url: string;
  className?: string;
}

const FigmaEmbed: React.FC<FigmaEmbedProps> = ({ title = 'Figma Design', url, className = '' }) => {
  // Extract the file ID from the Figma URL
  const getEmbedUrl = (figmaUrl: string) => {
    // Handle both full URLs and file IDs
    const fileId = figmaUrl.includes('file/')
      ? figmaUrl.split('file/')[1].split('/')[0]
      : figmaUrl;
    return `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileId}`;
  };

  return (
    <div className={`w-full h-full min-h-[500px] rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div className="w-full h-full">
        <iframe
          title={title}
          width="100%"
          height="100%"
          src={getEmbedUrl(url)}
          allowFullScreen
          className="border-0"
        />
      </div>
    </div>
  );
};

export default FigmaEmbed;
