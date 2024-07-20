document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#addTextBtn");

  function makeElementDraggable(element) {
    let offsetX, offsetY, mouseDownX, mouseDownY;

    element.addEventListener("mousedown", (e) => {
      mouseDownX = e.clientX;
      mouseDownY = e.clientY;
      // console.log(e)
      // console.log(mouseDownX, mouseDownY)
      const rect = element.getBoundingClientRect();
      // console.log(rect)
      offsetX = mouseDownX - rect.left;
      offsetY = mouseDownY - rect.top;
      // console.log(offsetX)
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    });

    function mouseMoveHandler(e) {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      element.style.left = `${newX}px`;
      element.style.top = `${newY}px`;
    }

    function mouseUpHandler() {
      document.removeEventListener("mousemove", mouseMoveHandler);
    }
    document.removeEventListener("mouseup", mouseUpHandler);
  }

  function addText() {
    const canvas = document.getElementById("canvas");
    const input = document.createElement("input");
    input.classList.add("input-canvas");
    input.value = "Enter text here";
    // input.style.left = "40px";
    // input.style.top = "50px";
    canvas.appendChild(input);

    makeElementDraggable(input);

    input.addEventListener("click", () => {
      activeInput = input;
    });

    const fontSelect = document.getElementById("fontSelect");
    const fontSize = document.getElementById("fontSize");
    const fontColor = document.getElementById("fontColor");

    function changeSizeOfInputField(sizeValue) {
      input.style.width = `${sizeValue * 8}px`;
      input.style.height = `${sizeValue * 1.5}px`;
    }

    function updateTextStyle() {
      input.style.fontFamily = fontSelect.value;
      input.style.fontSize = `${fontSize.value}px`;
      input.style.color = fontColor.value;

      changeSizeOfInputField(fontSize.value);
    }

    fontSelect.addEventListener("change", updateTextStyle);
    fontSize.addEventListener("input", updateTextStyle);
    fontColor.addEventListener("input", updateTextStyle);

    updateTextStyle();
  }

  btn.addEventListener("click", addText);
});
