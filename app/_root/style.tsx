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
    subtitle: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '900',
        marginTop: 6,
        backgroundColor: cor.c2,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        textShadowColor: 'rgba(0,0,0,0.25)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    highlightTitle: {
        fontSize: 28,
        color: '#000000ff',
        fontWeight: '900',
        marginTop: 6,
        backgroundColor: cor.c2,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
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
    ,
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
    }
    ,
    totalsContainer: {
        marginTop: 12,
        alignItems: 'center',
    },
    deliveryText: {
        color: cor.c3,
        fontSize: 16,
        fontWeight: '600',
    },
    totalText: {
        color: cor.c1,
        fontSize: 20,
        fontWeight: '700',
        marginTop: 6,
    }
    ,
    removeButton: {
        marginTop: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: '#b71c1c',
        borderRadius: 4,
        alignItems: 'center',
    },
    removeButtonText: {
        color: cor.c4,
        fontSize: 13,
        fontWeight: '600',
    }
    ,
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    qtyButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: cor.c1,
        borderRadius: 4,
        marginHorizontal: 6,
    },
    qtyText: {
        color: cor.c3,
        fontWeight: '600',
        minWidth: 24,
        textAlign: 'center',
    }
    ,
    whatsappButton: {
        marginTop: 14,
        padding: 12,
        backgroundColor: '#25D366',
        borderRadius: 6,
        alignItems: 'center',
    },
    whatsappButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    }
    ,
    itemFieldBold: {
        color: cor.c3,
        fontWeight: '700',
        marginTop: 6,
    }
});

export default styles;