import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { ListItem, Avatar, Card } from 'react-native-elements';
import { createTables, getInformasi, deleteInformasi } from '../Database';
import RNFS from 'react-native-fs';

export default function Data({ navigation }) {
  const [informasi, setInformasi] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    createTables();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getInformasi();
      setInformasi(data);
      setLoading(false);
    } catch (error) {
      console.error('Error mengambil data informasi:', error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar
        source={
          item.gambar_0910169
            ? { uri: item.gambar_0910169 }
            : require('../assets/img/novi.jpg')
        }
        rounded
        size="large"
      />
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          justifyContent: 'center',
        }}
      >
        <Text style={styles.title}>{item.judul_0910169}</Text>
        <Text style={styles.subtitle}>{item.tanggal_0910169}</Text>
      </View>
      <TouchableOpacity onPress={() => openModal(item)}>
        <Ionicons name="arrow-forward" size={20} color="#2596be" />
      </TouchableOpacity>
    </View>
  );

  // fungsi untuk menampilkan modal
  const openModal = item => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // fungsi untuk menutup modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  // fungsi ketika untuk tombol hapus di tekan
  const deleteData = async () => {
    if (selectedItem?.id) {
      Alert.alert(
        'Hapus Informasi',
        'Apakah Anda yakin ingin menghapus data ini?',
        [
          {
            text: 'Batal',
            onPress: () => console.log('Penghapusan dibatalkan'),
            style: 'cancel',
          },
          {
            text: 'Hapus',
            onPress: async () => {
              try {
                // Hapus data
                if (selectedItem?.gambar_0910169) {
                  const path = selectedItem.gambar_0910169.replace(
                    'file://',
                    '',
                  );
                  await RNFS.unlink(path);
                }
                // Menghapus data dari database
                await deleteInformasi(selectedItem.id);
                Alert.alert('Sukses', 'Data berhasil dihapus');
                setShowModal(false);
                fetchData();
              } catch (error) {
                console.error('Error menghapus data:', error);
                Alert.alert('Gagal', 'Tidak bisa menghapus data');
              }
            },
          },
        ],
        { cancelable: true },
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#2596be" />
        </View>
      ) : (
        <FlatList
          data={informasi}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={{ marginTop: 20 }}>
              <Text style={{ textAlign: 'center', color: '#999' }}>
                Data tidak ditemukan
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('FormAddInformasi')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* ini adalah tampil modal detail */}
      {showModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Isi konten modal */}
                <Card>
                  <Card.Title style={styles.modalTitle}>
                    {selectedItem?.judul_0910169}
                  </Card.Title>
                  <Card.Divider />
                  {selectedItem?.gambar_0910169 && (
                    <Card.Image
                      source={{ uri: selectedItem.gambar_0910169 }}
                      style={styles.imagePreview}
                    />
                  )}
                  <Text style={styles.modalDate}>
                    {selectedItem?.tanggal_0910169}
                  </Text>
                  <Text style={styles.modalDesc}>
                    {selectedItem?.deskripsi_0910169}
                  </Text>
                </Card>
              </ScrollView>

              {/* Tombol close */}
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={14} color="#fff" />
              </TouchableOpacity>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
              >
                <TouchableOpacity
                  style={styles.btnEdit}
                  onPress={() => {
                    navigation.navigate('FormEditInformasi', {
                      id: selectedItem?.id,
                    });
                    setShowModal(false);
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="create" size={20} color="#fff" />
                    <Text style={styles.btnText}>Edit</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnHapus} onPress={deleteData}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="trash" size={20} color="#fff" />
                    <Text style={styles.btnText}>Hapus</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  desc: {
    color: '#555',
    fontSize: 13,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#2596be',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
  // Untuk Modal
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  modalDesc: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalImage: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'rgba(254, 0, 0, 0.97)',
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  btnEdit: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#542dc1',
    padding: 10,
    borderRadius: 5,
  },
  btnHapus: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f30404',
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
