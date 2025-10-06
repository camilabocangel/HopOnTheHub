import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import users from "../data/users";
import profileStyles from "../styles/profileStyles";

export default function ProfileScreen() {
  const { colors } = useThemeColors();
  const user = users[0];

  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={[
          profileStyles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <View style={profileStyles.profileSection}>
          <View style={profileStyles.imageContainer}>
            <Image
              source={require("../../assets/joaquin-aguilera-profile-picture.jpg")}
              style={profileStyles.profileImage}
              resizeMode="cover"
            />
          </View>

          <Text style={[profileStyles.userName, { color: colors.text }]}>
            {user.name} {user.lastName}
          </Text>

          <Text style={[profileStyles.campus, { color: colors.primary }]}>
            Campus {user.campus}
          </Text>
        </View>

        <View style={profileStyles.infoSection}>
          <Text style={[profileStyles.sectionTitle, { color: colors.text }]}>
            Información Académica
          </Text>

          <View style={profileStyles.infoCard}>
            <View style={profileStyles.infoRow}>
              <Text style={[profileStyles.infoLabel, { color: colors.text }]}>
                Carrera:
              </Text>
              <Text style={[profileStyles.infoValue, { color: colors.text }]}>
                {user.career}
              </Text>
            </View>

            <View style={profileStyles.infoRow}>
              <Text style={[profileStyles.infoLabel, { color: colors.text }]}>
                Semestre:
              </Text>
              <Text style={[profileStyles.infoValue, { color: colors.text }]}>
                {user.semester}° Semestre
              </Text>
            </View>

            <View style={profileStyles.infoRow}>
              <Text style={[profileStyles.infoLabel, { color: colors.text }]}>
                Campus:
              </Text>
              <Text style={[profileStyles.infoValue, { color: colors.text }]}>
                {user.campus}
              </Text>
            </View>
          </View>
        </View>

        <View style={profileStyles.infoSection}>
          <Text style={[profileStyles.sectionTitle, { color: colors.text }]}>
            Información Personal
          </Text>

          <View style={profileStyles.infoCard}>
            <View style={profileStyles.infoRow}>
              <Text style={[profileStyles.infoLabel, { color: colors.text }]}>
                Nombre completo:
              </Text>
              <Text style={[profileStyles.infoValue, { color: colors.text }]}>
                {user.name} {user.lastName} {user.secondLastName}
              </Text>
            </View>

            <View style={profileStyles.infoRow}>
              <Text style={[profileStyles.infoLabel, { color: colors.text }]}>
                Código:
              </Text>
              <Text style={[profileStyles.infoValue, { color: colors.text }]}>
                {user.id}
              </Text>
            </View>

            <View style={profileStyles.infoRow}>
              <Text style={[profileStyles.infoLabel, { color: colors.text }]}>
                Edad:
              </Text>
              <Text style={[profileStyles.infoValue, { color: colors.text }]}>
                {calculateAge(user.birthday)} años
              </Text>
            </View>

            <View style={profileStyles.infoRow}>
              <Text style={[profileStyles.infoLabel, { color: colors.text }]}>
                Fecha de nacimiento:
              </Text>
              <Text style={[profileStyles.infoValue, { color: colors.text }]}>
                {formatDate(user.birthday)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
