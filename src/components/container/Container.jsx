import React from "react";
import Board from "../board/Board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenFancy,
  faEraser,
  faPalette,
  faChalkboard,
  faHandSparkles,
} from "@fortawesome/free-solid-svg-icons";

import "./containerStyle.css";

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "#000000",
      rememberColor: "#000000",
      size: "5",
      eraser: false,
      inputType: "pen",
    };
  }

  changeColor(params) {
    console.log(this.state.eraser);
    if (this.state.eraser === true) {
      this.setState({
        color: this.state.rememberColor,
        eraser: false,
      });
    } else {
      this.setState({
        color: params.target.value,
        rememberColor: params.target.value,
      });
    }
  }

  changeSize(params) {
    console.log(this.state.eraser);
    if (this.state.eraser === false) {
      this.setState({
        color: "#fffff",
        size: params.target.value,
      });
    } else {
      this.setState({
        color: this.state.rememberColor,
        size: params.target.value,
      });
    }
  }

  changeToEraser(params) {
    this.setState({
      size: params.target.value,
      color: "#fff",
      eraser: true,
    });
  }

  clearCanvas() {
    const canvas = document.querySelector("#board");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  render() {
    return (
      <div className="container">
        <div className="title-box">
          <FontAwesomeIcon icon={faChalkboard} className="icon" />
          <div className="title-text">CollaBoard</div>
        </div>
        <div className="tools">
          <div className="tools-color-picker">
            <FontAwesomeIcon icon={faPalette} className="icon" />

            <input
              type="color"
              value={this.state.rememberColor}
              onChange={this.changeColor.bind(this)}
              className="color-picker"
            />
          </div>

          <div className="tools-brushsize">
            <FontAwesomeIcon icon={faPenFancy} className="icon" />

            <button
              className="brush"
              value={5}
              onClick={this.changeSize.bind(this)}
            >
              5
            </button>
            <button
              className="brush"
              value={10}
              onClick={this.changeSize.bind(this)}
            >
              10
            </button>
            <button
              className="brush"
              value={15}
              onClick={this.changeSize.bind(this)}
            >
              15
            </button>
            <button
              className="brush"
              value={20}
              onClick={this.changeSize.bind(this)}
            >
              20
            </button>
          </div>

          <div className="tools-eraser">
            <FontAwesomeIcon icon={faEraser} className="icon" />

            <button
              className="eraser"
              value={20}
              onClick={this.changeToEraser.bind(this)}
            >
              20
            </button>
            <button
              className="eraser"
              value={40}
              onClick={this.changeToEraser.bind(this)}
            >
              40
            </button>
            <button
              className="eraser"
              value={60}
              onClick={this.changeToEraser.bind(this)}
            >
              60
            </button>
          </div>

          <div className="tools-clear">
            <FontAwesomeIcon icon={faHandSparkles} className="icon" />

            <button className="clear" onClick={this.clearCanvas}>
              Clear
            </button>
          </div>
        </div>

        <div className="board-container">
          <Board
            color={this.state.color}
            size={this.state.size}
            inputType={this.state.inputType}
          ></Board>
        </div>
      </div>
    );
  }
}

export default Container;
