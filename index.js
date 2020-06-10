
const EMBEDED_SANDBOX_GLOBAL_URL = "https://codesandbox.io/embed/github/e-baron/js-modern-web-development/tree/master/?fontsize=14&theme=dark";
let sandboxUrl;
let fileToOpen;
let elementWithLink;

document.querySelectorAll(".codesandbox").forEach(sandboxButton => {
    /** get the pathname from the previous element : go the parent, the element before the parent, 
     * the element inside this element : <a> 
     * NB : href provides the protocol with http://...
     */
    elementWithLink = sandboxButton.parentElement.previousElementSibling.firstElementChild;
    fileToOpen = elementWithLink.pathname;
    console.log(fileToOpen);
    
    sandboxUrl = EMBEDED_SANDBOX_GLOBAL_URL + "&initialpath=" + fileToOpen
                + "&module=" + fileToOpen;   

    /**
     * Check if there are multiple files associated to the link thanks to data attributes.
     * o get a data attribute through the dataset object, get the property by the part of the 
     * attribute name after data- (note that dashes are converted to camelCase).
     * If there is an associated file, add to the files to be opened in the codesandbox editor
     */
    if('associatedFiles' in elementWithLink.dataset)
        sandboxUrl+= "," + elementWithLink.dataset.associatedFiles;

    sandboxButton.href= sandboxUrl;
});