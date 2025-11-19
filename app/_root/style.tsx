import { StyleSheet } from "react-native";
import cor from "../_root/cores";

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imgfundo: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: cor.c1,
        borderRadius: 5,
    },
    buttonText: {
        color: cor.c4,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: cor.c4,
        textShadowColor: cor.c3,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    text: {
        color: cor.c4,
    }
});

export default styles;