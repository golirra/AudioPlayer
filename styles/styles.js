import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    borderTopWidth: 1, 
    borderTopColor: '#dcdcdc',
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

  albumCover: {
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
