import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const cores = {
  bg: "#0e1a1f",
  superficie: "#16262d",
  campo: "#0f1d23",
  tinta: "#e5eef1",
  suave: "#9db0b8",
  linha: "#2b404a",
  marca: "#5fc3d6",
  marcaTinta: "#06232b",
  topo: "#0a2830",
  topoSuave: "#8fb4be",
};

const usuarioLogado = { id: 10, nome: "Mariana Alves", tipo: "responsavel" };

const estudantes = [
  { id: 1, nome: "Pedro Alves", turma: "3B", responsavelId: 10 },
  { id: 2, nome: "Julia Alves", turma: "1A", responsavelId: 10 },
  { id: 3, nome: "Lucas Souza", turma: "2A", responsavelId: 99 },
];

const eventos = [
  { id: 1, titulo: "Reunião de pais - 3B", data: "20/10/2026" },
  { id: 2, titulo: "Feira de ciências", data: "05/11/2026" },
];

const servicosApoio = [
  { id: 1, nome: "Apoio pedagógico" },
  { id: 2, nome: "Orientação educacional" },
  { id: 3, nome: "Secretaria - 2a via de documentos" },
];

export default function TelaPortalEstudanteResponsavel() {
  const estudantesVisiveis =
    usuarioLogado.tipo === "responsavel"
      ? estudantes.filter((e) => e.responsavelId === usuarioLogado.id)
      : estudantes.filter((e) => e.nome === usuarioLogado.nome);

  const [estudanteSelecionado, setEstudanteSelecionado] = useState(
    usuarioLogado.tipo === "aluno" ? estudantesVisiveis[0] : null,
  );

  if (usuarioLogado.tipo === "responsavel" && !estudanteSelecionado) {
    return (
      <View style={styles.tela}>
        <View style={styles.topo}>
          <Text style={styles.topoTitulo}>Portal do estudante</Text>
          <Text style={styles.topoSubtitulo}>Olá, {usuarioLogado.nome}</Text>
        </View>

        <View style={styles.miolo}>
          <View style={styles.painel}>
            <Text style={styles.painelTitulo}>Selecione um estudante</Text>
            <Text style={styles.dica}>
              Você tem acesso aos estudantes vinculados ao seu perfil.
            </Text>

            <FlatList
              data={estudantesVisiveis}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cartao}
                  onPress={() => setEstudanteSelecionado(item)}
                >
                  <Text style={styles.cartaoTitulo}>{item.nome}</Text>
                  <Text style={styles.cartaoSub}>Turma {item.turma}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      <View style={styles.topo}>
        <Text style={styles.topoTitulo}>Portal do estudante</Text>
        <Text style={styles.topoSubtitulo}>
          {estudanteSelecionado.nome} - Turma {estudanteSelecionado.turma}
        </Text>
      </View>

      <FlatList
        style={styles.miolo}
        data={[]}
        keyExtractor={() => "x"}
        renderItem={null}
        ListHeaderComponent={
          <>
            {usuarioLogado.tipo === "responsavel" && (
              <TouchableOpacity
                style={styles.botaoSec}
                onPress={() => setEstudanteSelecionado(null)}
              >
                <Text style={styles.botaoSecTexto}>{"< Trocar estudante"}</Text>
              </TouchableOpacity>
            )}

            <View style={styles.painel}>
              <Text style={styles.painelTitulo}>Eventos e notícias</Text>
              {eventos.map((item) => (
                <View key={item.id} style={styles.linha}>
                  <Text style={styles.linhaTexto}>{item.titulo}</Text>
                  <Text style={styles.linhaSub}>{item.data}</Text>
                </View>
              ))}
            </View>

            <View style={styles.painel}>
              <Text style={styles.painelTitulo}>Serviços de apoio</Text>
              {servicosApoio.map((item) => (
                <TouchableOpacity key={item.id} style={styles.servico}>
                  <Text style={styles.servicoTexto}>{item.nome}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.bg },
  topo: {
    backgroundColor: cores.topo,
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 16,
  },
  topoTitulo: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  topoSubtitulo: { color: cores.topoSuave, marginTop: 4 },

  miolo: { flex: 1, padding: 16 },

  painel: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.linha,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  painelTitulo: {
    color: cores.tinta,
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 4,
  },
  dica: { color: cores.suave, marginBottom: 12, fontSize: 13 },

  cartao: {
    backgroundColor: cores.campo,
    borderWidth: 1,
    borderColor: cores.linha,
    borderRadius: 8,
    padding: 14,
    marginTop: 10,
  },
  cartaoTitulo: { color: cores.tinta, fontSize: 16, fontWeight: "bold" },
  cartaoSub: { color: cores.suave, marginTop: 2 },

  botaoSec: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: cores.linha,
    backgroundColor: "transparent",
    marginBottom: 16,
  },
  botaoSecTexto: { color: cores.marca, fontWeight: "600", fontSize: 13 },

  linha: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: cores.linha,
  },
  linhaTexto: { color: cores.tinta, fontWeight: "500" },
  linhaSub: { color: cores.suave, fontSize: 12, marginTop: 2 },

  servico: {
    backgroundColor: cores.campo,
    borderWidth: 1,
    borderColor: cores.linha,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  servicoTexto: { color: cores.tinta },
});
