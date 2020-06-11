const EMBEDED_SANDBOX_GLOBAL_URL =
  "https://codesandbox.io/embed/github/e-baron/js-modern-web-development/tree/master/?fontsize=14&theme=dark";
let sandboxUrl;
let fileToOpen;
let elementWithLink;

createEmbededSandboxUrl(EMBEDED_SANDBOX_GLOBAL_URL, "codesandbox");

/**
 * function which change all endpoint URL (or local URL, such as /demo/js-location/...) 
 * to external URL to an Embeded Codesandbox
 * This function applies to HTML components that contains those parameters :
 * - class={classContainingLocalUrl}
 * - href={localURL}
 * - data-associated-files={localURL of all files you want to see opened in the editor seperated by comma}
 * @param {embededGlobalUrl} URL to be used to access to an embedded Sandbox 
 * @param {classContainingLocalUrl}
 */
function createEmbededSandboxUrl(embededGlobalUrl,classContainingLocalUrl) {
  document.querySelectorAll("."+classContainingLocalUrl).forEach((sandboxButton) => {
    /** get the pathname from the element
     * NB : href provides the protocol with http://...
     */
    fileToOpen = sandboxButton.pathname;
    console.log(fileToOpen);

    sandboxUrl =
      embededGlobalUrl + "&initialpath=" + fileToOpen + "&module=" + fileToOpen;

    /**
     * Check if there are multiple files associated to the link thanks to data attributes.
     * o get a data attribute through the dataset object, get the property by the part of the
     * attribute name after data- (note that dashes are converted to camelCase).
     * If there is an associated file, add to the files to be opened in the codesandbox editor
     */
    if ("associatedFiles" in sandboxButton.dataset)
      sandboxUrl += "," + sandboxButton.dataset.associatedFiles;

    sandboxButton.href = sandboxUrl;
  });
}
