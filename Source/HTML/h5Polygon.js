window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded () {
  canvasApp(); // 包含整个Canvas应用程序
}
function canvasSupport(e) {
  return !!e.getContext;
}
function canvasApp() {
  let canvas = document.getElementById('canvas');
  //canvas.width = document.documentElement.clientWidth;
  //canvas.height = document.documentElement.clientHeight;
  Point = function (x, y) {
    this.x = x;
    this.y = y;
  };

  const colors = ['#f0f', '#eef', '#ff0', '#f0f', '#aaf', '#0f0', '#ccc', '#999', '#eee', '#ccc', '#606'];
  if (!canvasSupport(canvas)) {
    return;
  }
  let ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth-7; // - 100;
  canvas.height = window.innerHeight-7; // - 50;

  function drawHorizontalAxis() {
    ctx.beginPath();
    ctx.moveTo(10, canvas.height / 2 + 0.5);
    ctx.lineTo(canvas.width - 10, canvas.height / 2);
    ctx.stroke();
  }

  function drawVerticalAxis() {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 10);
    ctx.lineTo(canvas.width / 2, canvas.height - 10);
    ctx.stroke();
  }

  function getPolygonPoints(centerX, centerY, radius, sides, startAngle) {
    const points = [];
    let angle = startAngle || 0;
    for (let i = 0; i < sides; ++i) {
      points.push(new Point(
        centerX + radius * Math.sin(angle),
        centerY - radius * Math.cos(angle)
      ));
      angle += 2 * Math.PI / sides;
    }
    return points;
  }

  function createPolygonPath(centerX, centerY, radius, sides, startAngle) {
    const points = getPolygonPoints(centerX, centerY, radius, sides, startAngle);

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < sides; ++i) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = colors[sides];
    ctx.closePath();
  }

  function drawRubberbandShape(currentSides) {
    createPolygonPath(
      (canvas.width) / 2,
      (canvas.height) / 2,
      150, currentSides, Math.PI * 2
    );
    ctx.stroke();
  }

  function drawScreen() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#b3c3de';
    ctx.font = '24px Arial';
    drawHorizontalAxis();
    drawVerticalAxis();

    let curSides = 3;
    setInterval(function() {
      drawRubberbandShape(curSides++);
      if (curSides > 10) {
        curSides = 3;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHorizontalAxis();
        drawVerticalAxis();
      }
    }, 1200);
  }
  drawScreen();
}

