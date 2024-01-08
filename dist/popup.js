// Affichage pupup victoire ou défaite
export function win() {
    console.log("win");
    show("win");
}
export function lose() {
    show("lose");
}
// Affichage d'un popup quelconque en modifiant style
export function show(popup) {
    const div = document.getElementById(popup);
    div === null || div === void 0 ? void 0 : div.classList.remove("hidden");
}
