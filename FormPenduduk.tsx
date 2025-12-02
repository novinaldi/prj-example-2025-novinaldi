import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { Input, Text, Button, Divider, Icon } from '@rneui/themed';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

const RadioGroup = ({ label, options, selected, onSelect }) => (
  <View style={styles.radioGroup}>
    <Text style={styles.radioLabel}>{label}</Text>
    <View style={styles.radioContainer}>
      {options.map(option => (
        <View key={option.value} style={styles.radioOption}>
          <Button
            title={option.label}
            type={selected === option.value ? 'solid' : 'outline'}
            buttonStyle={styles.radioButtonStyle}
            titleStyle={styles.radioTitleStyle}
            onPress={() => onSelect(option.value)}
          />
        </View>
      ))}
    </View>
  </View>
);
export default function FormPenduduk() {
  const [nik, setNik] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(null);
  const [jenisKelamin, setJenisKelamin] = useState('L');
  const [statusKawin, setStatusKawin] = useState('BELUM');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Opsi untuk Radio Button
  const genderOptions = [
    { label: 'Laki-laki', value: 'L' },
    { label: 'Perempuan', value: 'P' },
  ];
  const maritalOptions = [
    { label: 'Menikah', value: 'MENIKAH' },
    { label: 'Belum Menikah', value: 'BELUM' },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = date => {
    setTanggalLahir(date);
    hideDatePicker();
  };

  // Format tanggal untuk ditampilkan di Input
  const formattedDate = tanggalLahir
    ? tanggalLahir.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  var nama = 'John Doe';

  const handleSubmit = () => {
    // Validasi sederhana
    if (!nik || nik.length !== 16 || !namaLengkap || !tanggalLahir) {
      Alert.alert('Gagal', 'NIK harus 16 digit dan semua field wajib diisi!');
      return;
    }

    // Kumpulkan semua state ke dalam objek
    const dataPenduduk = {
      NIK: nik,
      Nama: namaLengkap,
      'Tempat Lahir': tempatLahir,
      'Tanggal Lahir': formattedDate,
      'Jenis Kelamin': jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
      'Status Kawin': statusKawin,
    };

    // Tampilkan di Console (Sesuai permintaan)
    console.log('Data Penduduk Disubmit:', dataPenduduk);

    // Tampilkan di Alert (Sesuai permintaan)
    Alert.alert(
      'Data Berhasil Disimpan',
      `Nama: ${dataPenduduk.Nama}\nNIK: ${dataPenduduk.NIK}\nStatus: ${dataPenduduk['Status Kawin']}`,
      [{ text: 'OK' }],
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h3 style={styles.header}>
        Form Input Data Penduduk
      </Text>
      <Divider style={styles.divider} />
      {/* Input NIK */}
      <Input
        label="Nomor Induk Kependudukan (NIK)"
        placeholder="Masukkan 16 digit NIK"
        value={nik}
        onChangeText={setNik}
        keyboardType="numeric"
        maxLength={16}
        containerStyle={styles.inputContainer}
      />
      {/* Input Nama Lengkap */}
      <Input
        label="Nama Lengkap"
        placeholder="Nama Lengkap sesuai KTP"
        value={namaLengkap}
        onChangeText={setNamaLengkap}
        containerStyle={styles.inputContainer}
      />
      {/* Input Tempat Lahir */}
      <Input
        label="Tempat Lahir"
        placeholder="Contoh: Jakarta"
        value={tempatLahir}
        onChangeText={setTempatLahir}
        containerStyle={styles.inputContainer}
      />
      {/* Input Tanggal Lahir (Date Picker) */}
      <View style={styles.dateInputWrapper}>
        <Input
          label="Tanggal Lahir"
          placeholder="Pilih Tanggal"
          value={formattedDate}
          disabled={true} // Non-aktifkan input teks
          containerStyle={styles.dateInputContainer}
        />
        <Button
          title=""
          onPress={showDatePicker}
          type="solid"
          buttonStyle={styles.dateButtonStyle}
          icon={<Icon name="calendar" type="font-awesome" color="#fff" />}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        date={tanggalLahir || new Date()}
      />
      {/* Jenis Kelamin (Radio Group) */}
      <RadioGroup
        label="Jenis Kelamin"
        options={genderOptions}
        selected={jenisKelamin}
        onSelect={setJenisKelamin}
      />
      {/* Status Kawin (Radio Group) */}
      <RadioGroup
        label="Status Kawin"
        options={maritalOptions}
        selected={statusKawin}
        onSelect={setStatusKawin}
      />
      {/* Tombol Submit */}
      <Button
        title="Submit Data"
        onPress={handleSubmit}
        buttonStyle={styles.submitButton}
      />
      {/* Tampilkan State Saat Ini di Layar (untuk debugging) */}
      <View style={styles.debugBox}>
        <Text style={styles.debugHeader}>State Form Saat Ini:</Text>
        <Text style={styles.debugText}>NIK: {nik}</Text>
        <Text style={styles.debugText}>Nama: {namaLengkap}</Text>
        <Text style={styles.debugText}>Tgl Lahir: {formattedDate}</Text>
        <Text style={styles.debugText}>JK: {jenisKelamin}</Text>
        <Text style={styles.debugText}>Status: {statusKawin}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
    fontWeight: '700',
  },
  divider: {
    marginVertical: 15,
    height: 2,
    backgroundColor: '#007AFF',
  },
  inputContainer: {
    marginBottom: 10,
  },
  // --- Date Picker Styling ---
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 10,
  },
  dateInputContainer: {
    flex: 1,
  },
  dateButtonStyle: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    height: 50,
    marginLeft: 10,
    paddingHorizontal: 15,
  },
  radioGroup: {
    marginVertical: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  radioOption: {
    marginRight: 15,
  },
  radioButtonStyle: {
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  radioTitleStyle: {
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 12,
  },
  debugBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  debugHeader: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007AFF',
  },
  debugText: {
    fontSize: 12,
    color: '#555',
  },
});
