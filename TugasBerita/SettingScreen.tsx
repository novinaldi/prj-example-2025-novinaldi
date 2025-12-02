import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { getTableList, getTableFields } from './Database';

export default function SettingScreen() {
  const [tables, setTables] = useState([]);
  const [expandedTable, setExpandedTable] = useState(null);
  const [fields, setFields] = useState({}); // State untuk menyimpan kolom per tabel

  // Ambil daftar tabel saat pertama kali komponen dimuat
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const tableList = await getTableList(); // Mendapatkan daftar tabel
        setTables(tableList); // Menyimpan nama tabel
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };
    fetchTables();
  }, []);

  // Fungsi untuk toggle expand/collapse tabel
  const toggleTable = async tableName => {
    if (expandedTable === tableName) {
      setExpandedTable(null); // Menutup tabel jika sudah terbuka
    } else {
      setExpandedTable(tableName); // Membuka tabel dan menampilkan kolom
      // Ambil kolom untuk tabel yang dipilih
      try {
        const fieldList = await getTableFields(tableName); // Mendapatkan nama kolom untuk tabel ini
        setFields(prevFields => ({
          ...prevFields,
          [tableName]: fieldList,
        }));
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    }
  };

  // Render setiap tabel beserta kolom-kolomnya
  const renderItem = ({ item }) => {
    return (
      <View style={styles.tableContainer}>
        <TouchableOpacity onPress={() => toggleTable(item.name)}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.tableTitle}>
                Tabel: {item.name}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>

        {expandedTable === item.name && (
          <View style={styles.fieldsContainer}>
            {fields[item.name] ? (
              fields[item.name].map((field, index) => (
                <Text key={index} style={styles.fieldName}>
                  - {field}
                </Text>
              ))
            ) : (
              <Text style={styles.fieldName}>Loading columns...</Text>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tables}
        keyExtractor={item => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: 10,
  },
  tableContainer: {
    marginBottom: 10,
  },
  tableTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  fieldsContainer: {
    paddingLeft: 20,
    marginTop: 5,
  },
  fieldName: {
    fontSize: 16,
    color: '#555',
  },
});
