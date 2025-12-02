import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import Ionicons from '@react-native-vector-icons/ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import { getInformasiById, updateInformasi } from '../Database';

export default function FormEditInformasi({ navigation, route }) {
  const { id } = route.params;
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [tanggal, setTanggal] = useState(new Date());
  const [gambar, setGambar] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Ambil data berdasarkan id saat halaman di tampilkan
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInformasiById(id);
        setJudul(data.judul_0910169);
        setDeskripsi(data.deskripsi_0910169);
        setTanggal(new Date(data.tanggal_0910169));
        setGambar(data.gambar_0910169);
      } catch (error) {
        console.error('Error mengambil data informasi:', error);
      }
    };

    fetchData();
  }, [id]);

  // Koding dibawah ini hampir sama dengan perintah pada form tambah
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tanggal;
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    setTanggal(currentDate);
  };

  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setGambar(uri); // Set gambar yang dipilih
      }
    });
  };

  // perintah untuk mengupdate data informasi
  const updateDataInformasi = async () => {
    if (!judul || !deskripsi || !gambar) {
      Alert.alert('Peringatan', 'Semua field harus diisi!');
      return;
    }

    try {
      await updateInformasi(
        id,
        judul,
        deskripsi,
        gambar,
        tanggal.toISOString(),
      );
      Alert.alert('Berhasil', 'Data berhasil diperbarui');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Gagal', 'Tidak bisa memperbarui data');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Judul"
        value={judul}
        onChangeText={setJudul}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Deskripsi"
        multiline
        value={deskripsi}
        onChangeText={setDeskripsi}
      />
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={showDatepicker}
      >
        <Text style={styles.dateText}>{tanggal.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={tanggal}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.imagePickerButton} onPress={chooseImage}>
        {!gambar ? (
          <>
            <Ionicons name="image" size={30} color="#000" />
            <Text style={styles.imageText}>Pilih Gambar</Text>
          </>
        ) : (
          <>
            <Image source={{ uri: gambar }} style={styles.imagePreview} />
            <Text style={styles.imageText}>Gambar Terpilih</Text>
          </>
        )}
      </TouchableOpacity>

      <Button
        title="Update Informasi"
        onPress={updateDataInformasi}
        icon={<Ionicons name="checkmark-circle" size={20} color="#fff" />}
        buttonStyle={{ backgroundColor: '#1abc02' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  datePickerButton: {
    height: 50,
    borderColor: '#ccc',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  imagePickerButton: {
    height: 150,
    backgroundColor: '#FFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    flexDirection: 'column',
    gap: 10,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#000',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageText: {
    color: '#000',
    fontSize: 16,
  },
});
