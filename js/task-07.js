const selectFontSizeEl = document.querySelector("#font-size-control");
const spanText = document.querySelector("#text");
selectFontSizeEl.setAttribute("value", "16");
selectFontSizeEl.addEventListener("input",
    handleSelectFontSize);
    
function handleSelectFontSize() {
    const handleFontSize = selectFontSizeEl.value;
    spanText.style.fontSize = `${handleFontSize}px`;
    console.log(spanText.style.fontSize);
}
