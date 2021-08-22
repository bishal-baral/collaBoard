import React from "react";
import io from "socket.io-client";

import "./boardStyle.css";

class Board extends React.Component {
  timeout;
  socket = io.connect("http://localhost:5000");
  inputType;
  ctx;
  isDrawing = false;

  constructor(props) {
    super(props);

    this.socket.on("canvasData", function (data) {
      const root = this;
      const interval = setInterval(function () {
        if (root.isDrawing) return;
        root.isDrawing = true;
        clearInterval(interval);
        let image = new Image();
        const canvas = document.querySelector("#board");
        const ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);

          root.isDrawing = false;
        };
        image.src = data;
      }, 200);
    });
  }

  componentDidMount() {
    this.drawOnCanvas();
  }

  componentWillReceiveProps(newProps) {
    this.ctx.strokeStyle = newProps.color;
    this.ctx.lineWidth = newProps.size;
  }

  drawOnCanvas() {
    const canvas = document.querySelector("#board");
    this.ctx = canvas.getContext("2d");
    const ctx = this.ctx;

    const boardContainer = document.querySelector("#boardContainer");
    const boardContainerStyle = getComputedStyle(boardContainer);
    canvas.width = parseInt(boardContainerStyle.getPropertyValue("width"));
    canvas.height = parseInt(boardContainerStyle.getPropertyValue("height"));

    const mouse = { x: 0, y: 0 };
    const last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = this.props.size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = this.props.color;

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    let root = this;

    const onPaint = function () {
      if (root.props.inputType === "pen") {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
      }

      if (root.timeout !== undefined) clearTimeout(root.timeout);
      root.timeout = setTimeout(function () {
        let base64ImageData = canvas.toDataURL("image/png");
        root.socket.emit("canvasData", base64ImageData);
      }, 1000);
    };
  }

  render() {
    return (
      <div className="boardContainer" id="boardContainer">
        <canvas className="board" id="board"></canvas>
      </div>
    );
  }
}

export default Board;
