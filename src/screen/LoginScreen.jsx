import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/InputField";
import Button from "../components/Button";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRegister = () => {
    navigation.navigate("REGISTER");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://13.126.76.119:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert(
          "Login Successful",
          "You have successfully logged in!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("SUBSCRIPTION"),
            },
          ],
          { cancelable: false }
        );
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons
          name={"arrow-back-outline"}
          color={colors.primary}
          size={25}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>
      <View style={styles.formContainer}>
        <InputField
          icon="ios-phone-portrait"
          placeholder="Enter your Mobile Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <InputField
          icon="ios-lock"
          placeholder="Enter your password"
          secureTextEntry={secureEntry}
          value={password}
          onChangeText={setPassword}
        />
    
        <Button title="Login" onPress={handleLogin} />
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: colors.secondary,
    marginVertical: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  accountText: {
    fontSize: 16,
    color: colors.secondary,
  },
  registerText: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 5,
  },
});
