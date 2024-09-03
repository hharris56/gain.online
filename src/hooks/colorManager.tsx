"use client"

export default class ColorManager{

    light_gray="#bdbdbd"

    resetColors() {
        if (document){
            document.documentElement.style.setProperty("--primary-color", "black"); //"#383838");
            document.documentElement.style.setProperty("--accent-color", "#6CD4FF");
            document.documentElement.style.setProperty("--primary-text-color", "white"); //"#bdbdbd");
            document.documentElement.style.setProperty("--secondary-text-color", "#6CD4FF");  //"white");
            document.documentElement.style.setProperty("--menu-text-color", "red");
        }
    }
}