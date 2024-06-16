export default class ColorManager{
    resetColors() {
        if (document){
            document.documentElement.style.setProperty("--primary-color", "white");
            document.documentElement.style.setProperty("--accent-color", "lightblue");
            document.documentElement.style.setProperty("--primary-text-color", "black");
            document.documentElement.style.setProperty("--secondary-text-color", "black");
        }
    }
}