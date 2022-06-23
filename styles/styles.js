import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
  },

  playbackContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    fontWeight: 'bold'
  },

  button: {
    width: 60,
    height: 60,
  },

  buttonContainer: {
    marginTop: 10,
    padding: 20,
  },

  buttonBackground: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
    height: 80,
    width: "90%",
    backgroundColor: "white",
  },

  albumCover: {
    width: 300,
    height: 300,
  },

  text: {
    textAlign: "center",
    justifyContent: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    padding: 20
  },
});

export default styles;
