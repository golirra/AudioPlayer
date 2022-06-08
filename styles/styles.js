import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    backgroundColor: "#ecf7d9",
    padding: 10,
  },

  button: {
    flex: 1,
    width: 10,
    height: 50,
    color: "black",
  },
  buttonContainer: {
    width: 500,
    color: "red",
    elevation: 8,
    backgroundColor: "#000000",
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  albumCover: {
    flex: 1,
    width: 300,
    height: 300,
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 30,
  },
});

export default styles;
