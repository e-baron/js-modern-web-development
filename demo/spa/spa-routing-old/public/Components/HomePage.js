let homePage = `<p>Welcome to MyCMS...</p>
`;

const HomePage = () => {
    /* Render this element in the container */
    let homePageElement = document.querySelector("data-component-name='HomePage'");
    homePageElement.innerHTML = homePage;
};

export default HomePage;