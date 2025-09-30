export const drawCountdown = (canvas, video, count) => {
  if (!canvas || !video) return;
  
  const ctx = canvas.getContext('2d');
  
  // Ensure canvas is sized properly
  if (video.videoWidth > 0 && video.videoHeight > 0) {
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }
  }

  // Clear and draw video
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Draw semi-transparent overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw countdown text
  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#ff0000';
  ctx.shadowBlur = 20;
  
  const fontSize = Math.min(canvas.height / 3, 200);
  ctx.font = `bold ${fontSize}px 'Space Mono', monospace`;
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const display = count === 0 ? 'GO!' : count.toString();
  ctx.fillText(display, canvas.width / 2, canvas.height / 2);
};

