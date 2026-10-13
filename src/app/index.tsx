import { SafeAreaView, StyleSheet } from "react-native";
import TelaPortalEstudanteResponsavel from "../../src/components/TelaPortalEstudanteResponsavel";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TelaPortalEstudanteResponsavel />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e1a1f",
  },
});
