const fs = require("node:fs");
const { createCanvas } = require("canvas");

// アイコンのサイズ
const sizes = [
  { name: "favicon", size: 32 },
  { name: "apple-touch-icon", size: 180 },
  { name: "icon-192", size: 192 },
  { name: "icon-512", size: 512 },
];

// 各サイズのアイコンを生成
for (const { name, size } of sizes) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // 背景を描画
  ctx.fillStyle = "#f8fafc";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - size / 16, 0, 2 * Math.PI);
  ctx.fill();

  // 外枠を描画
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = size / 16;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - size / 16, 0, 2 * Math.PI);
  ctx.stroke();

  // 時計の目盛りを描画
  const drawTick = (angle, length, width, color) => {
    const rad = (angle * Math.PI) / 180;
    const innerRadius = size / 2 - size / 5;
    const outerRadius = size / 2 - size / 10;

    ctx.beginPath();
    ctx.moveTo(
      size / 2 + innerRadius * Math.cos(rad),
      size / 2 + innerRadius * Math.sin(rad),
    );
    ctx.lineTo(
      size / 2 + outerRadius * Math.cos(rad),
      size / 2 + outerRadius * Math.sin(rad),
    );
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  };

  // 12, 3, 6, 9の目盛りを描画
  for (const angle of [0, 90, 180, 270]) {
    drawTick(angle, size / 20, size / 40, "#475569");
  }

  // 時針（12時方向）
  ctx.beginPath();
  ctx.moveTo(size / 2, size / 2);
  ctx.lineTo(size / 2, size / 2 - size / 4);
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = size / 20;
  ctx.lineCap = "round";
  ctx.stroke();

  // 分針（3時方向）
  ctx.beginPath();
  ctx.moveTo(size / 2, size / 2);
  ctx.lineTo(size / 2 + size / 3, size / 2);
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = size / 25;
  ctx.lineCap = "round";
  ctx.stroke();

  // 中心点
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 25, 0, 2 * Math.PI);
  ctx.fillStyle = "#1e293b";
  ctx.fill();

  // PNGとして保存
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`public/${name}.png`, buffer);

  console.log(`Generated ${name}.png (${size}x${size})`);
}

console.log("All icons generated successfully!");
