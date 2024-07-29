"use client"

export default class ColorManager{

    light_gray="#bdbdbd"

    resetColors() {
        if (document){
            document.documentElement.style.setProperty("--primary-color", "#383838");
            document.documentElement.style.setProperty("--accent-color", "lightblue");
            document.documentElement.style.setProperty("--primary-text-color", "#bdbdbd");
            document.documentElement.style.setProperty("--secondary-text-color", "white");
            document.documentElement.style.setProperty("--menu-text-color", "red");
        }
    }
}