// Affichage pupup victoire ou défaite
export function win(){
    console.log("win");
    show("win");
}

export function lose(){
    show("lose");
}

// Affichage d'un popup quelconque en modifiant style
export function show( popup: string){
    const div = document.getElementById(popup);
    div?.classList.remove("hidden");
}