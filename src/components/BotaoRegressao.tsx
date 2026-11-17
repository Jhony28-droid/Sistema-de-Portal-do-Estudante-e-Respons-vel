import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  destino?: Href;
};

export default function BotaoRegressaoAluno({ destino = "/" }: Props) {
  const router = useRouter();

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(destino);
    }
  }

  return (
    <Pressable
      onPress={voltar}
      accessibilityRole="button"
      accessibilityLabel="Voltar à funcionalidade anterior"
      style={styles.botao}
    >
      <Text style={styles.texto}>{"< Voltar"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2b404a",
    backgroundColor: "transparent",
  },
  texto: {
    color: "#5fc3d6",
    fontWeight: "600",
  },
});