const acceptedFileTypes =  ['pdf', 'jpg', 'gif', 'jpeg', 'bmp', 'tif', 'tiff', 'png', 'xps', 'doc', 'docx', 'wmp', 'ico', 'txt', 'csv', 'rtf', 'xls', 'xlsx']

const fileInput = document.getElementById("fileInput"),
    fileList = document.getElementById("fileList");

fileInput.addEventListener("change", handleFiles, false);

var allFiles = []

function removeFile(index) {
    allFiles.splice(index, 1);
}


function handleFiles() {
    if (fileInput.files.length == 0) {
        fileList.innerHTML = "";
    }

    if(this.files.length > 0) {
        for (let i = 0; i < this.files.length; i++) {

            allFiles.push(this.files[i])

            const li = document.createElement("li");
            // add or remove multiple classes using spread syntax
            const liCls = ["list-group-item", "d-flex", "justify-content-between", "align-items-center"];
            li.classList.add(...liCls);
            fileList.appendChild(li);

            const fileName = document.createElement("a")
            const fileNameCls = ["file-name", "font-weight-bold"]
            fileName.classList.add(...fileNameCls)
            fileName.innerHTML = this.files[i].name;
            li.appendChild(fileName)
            fileName.href = URL.createObjectURL(this.files[i])

            const sizeUnits = ["KiB", "MiB"];
            for (nUnit = 0, sizeApprox = this.files[i].size / 1024; sizeApprox > 1; sizeApprox /= 1024, nUnit++) {
                sizeOutput = sizeApprox.toFixed(0) + " " + sizeUnits[nUnit];
              }

            const fileSize = document.createElement("span")
            const fileSizeCls = ["pl-1", "file-size"]
            fileSize.classList.add(...fileSizeCls)
            fileSize.innerHTML = " (" + sizeOutput + ")";
            li.appendChild(fileSize)


            const deleteSpan = document.createElement("span")
            deleteSpan.classList.add("delete-icon")
            deleteSpan.dataset.toggle = "tooltip"
            deleteSpan.dataset.placement = "bottom"
            deleteSpan.setAttribute("title", "Remove attachment")

            const deleteIcon = document.createElement("i")
            deleteIcon.classList.add("far", "fa-trash-alt")
            deleteSpan.appendChild(deleteIcon)
            li.appendChild(deleteSpan)


            deleteSpan.addEventListener("click", function() {
                // var listItems = fileList.childNodes
                var listItems = $("#fileList li")
                var listIndex = listItems.index(this.parentNode)
                removeFile(listIndex)
                this.parentNode.remove()
            });
        }
    }
}