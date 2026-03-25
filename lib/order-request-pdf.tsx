import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { ContactPayload } from "@/lib/send-contact-email";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.45,
  },
  title: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 9,
    color: "#555",
    marginBottom: 20,
  },
  section: { marginBottom: 12 },
  label: {
    fontSize: 8,
    color: "#666",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  value: { fontSize: 11 },
  boxed: {
    marginTop: 4,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  footer: {
    position: "absolute",
    bottom: 36,
    left: 48,
    right: 48,
    fontSize: 8,
    color: "#888",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 8,
  },
});

function OrderRequestPdf({ data }: { data: ContactPayload }) {
  const generated = new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Nezávazná poptávka</Text>
        <Text style={styles.subtitle}>
          Ing. Radim Hubený — projekce staveb | odesláno z webu
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>Jméno</Text>
          <Text style={styles.value}>{data.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{data.email}</Text>
        </View>
        {data.phone ? (
          <View style={styles.section}>
            <Text style={styles.label}>Telefon</Text>
            <Text style={styles.value}>{data.phone}</Text>
          </View>
        ) : null}
        <View style={styles.section}>
          <Text style={styles.label}>Typ projektu</Text>
          <Text style={styles.value}>{data.projectType}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Zpráva</Text>
          <View style={styles.boxed}>
            <Text style={styles.value}>{data.message}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>
            Dokument má pouze informativní charakter a není závaznou objednávkou.
            Vygenerováno: {generated}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function buildOrderRequestPdfBuffer(
  data: ContactPayload
): Promise<Buffer> {
  const element = <OrderRequestPdf data={data} />;
  return renderToBuffer(element);
}
