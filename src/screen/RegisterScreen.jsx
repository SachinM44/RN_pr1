import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../utils/colors";
import InputField from "../components/InputField";
import Button from "../components/Button";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://13.126.76.119:8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert(
          "Registration Successful",
          "You have successfully registered!",
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
        <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
      </View>
      <View style={styles.formContainer}>
        <InputField
          icon="person-outline"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <InputField
          icon="mail-outline"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          icon="call-outline"
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <InputField
          icon="lock-closed-outline"
          placeholder="Enter your password"
          secureTextEntry={secureEntry}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Register" onPress={handleRegister} />
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account!</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primary,
  },
  formContainer: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  accountText: {
    fontSize: 16,
    color: colors.gray,
  },
  loginText: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 5,
  },
});

export default RegisterScreen;
