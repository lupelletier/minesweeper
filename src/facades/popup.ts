export class Popup {

    public static readonly INSTANCE : Popup = new Popup();
    private constructor(){}
    
    // Affichage pupup victoire ou défaite
    win(){
        this.show("win");
    }

    lose(){
        this.show("lose");
    }

    // Affichage d'un popup quelconque en modifiant style
    show( popup: string){
        const div = document.getElementById(popup);
        div?.classList.remove("hidden");
    }
}