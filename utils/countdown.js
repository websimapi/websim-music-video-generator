export const drawCountdown = (canvas, video, count) => {
  const ctx = canvas.getContext('2d');
  
  if (video.videoWidth > 0 && video.videoHeight > 0) {
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
           canvas.width = video.videoWidth;
           canvas.height = video.videoHeight;
      }
  }

  ctx.save();
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#ff0000';
  ctx.shadowBlur = 20;
  
  const fontSize = Math.min(canvas.height / 3, 200);
  ctx.font = `bold ${fontSize}px 'Space Mono', monospace`;
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const display = count === 0 ? 'GO!' : count.toString();
  ctx.fillText(display, canvas.width / 2, canvas.height / 2);
  ctx.restore();
};

