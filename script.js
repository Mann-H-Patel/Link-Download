document.getElementById("nameInput").addEventListener("input", function () {
    document.getElementById("userName").innerText = this.value;
});
 
document.getElementById("paragraphInput").addEventListener("input", function () {
    const words = this.value.split(" ");
    let formattedText = "";
 
    for (let i = 0; i < words.length; i++) {
        formattedText += words[i] + " ";
 
        if ((i + 1) % 5 === 0) {
            formattedText += "\n"; // Insert a new line after every 5 words
        }
    }
 
    document.getElementById("customParagraph").innerText = formattedText.trim();
});
 
 
document.getElementById("imageInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("userImage").src = e.target.result;
            document.getElementById("userImage").style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});
 
// Enable dragging for text and image
function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;
 
    element.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        element.style.cursor = "grabbing";
    });
 
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
 
        element.style.left = newX + "px";
        element.style.top = newY + "px";
    });
 
    document.addEventListener("mouseup", () => {
        isDragging = false;
        element.style.cursor = "grab";
    });
}
 
makeDraggable(document.getElementById("userImage"));
makeDraggable(document.getElementById("userName"));
makeDraggable(document.getElementById("customParagraph"));
 
// Download invitation as image
document.getElementById("downloadBtn").addEventListener("click", function () {
    const card = document.getElementById("invitation-container");
 
    html2canvas(card, { scale: 2, useCORS: true }).then(canvas => {
        canvas.toBlob(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "custom-invitation.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, "image/png");
    }).catch(error => console.error("Error generating image:", error));
});
