import { StyleSheet } from "react-native";
import cor from "../_root/cores";

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        height: "100%",
        width: "100%",
        backgroundColor: cor.c2,
    },
    conteinerLogin: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: cor.c2,
    },
    imgfundo: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: cor.c1,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: cor.c4,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: cor.c1,
        textShadowColor: cor.c4,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    text: {
        color: cor.c3,
    },
    list: {
        flex: 1,
        width: "100%",
        gap: 10,
        padding: 10,
    },
    itemList:{
        backgroundColor: cor.c2,
        margin: 5,
        padding: 10,
        borderRadius: 5,
    }
});

export default styles;