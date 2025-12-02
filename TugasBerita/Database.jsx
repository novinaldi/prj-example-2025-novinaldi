import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'dbmobile2_0910169.db', // ganti sesuai dengan nobp kalian masing-masing
    location: 'default',
  },
  () => console.log('Database opened'),
  error => console.log('Database error: ' + error),
);

// Membuat tabel "informasi", ganti yang ada nobpnya menjadi nobp kalian masing-masing
export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS informasi_0910169 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tanggal_0910169 TEXT,
        judul_0910169 TEXT,
        deskripsi_0910169 TEXT,
        gambar_0910169 TEXT
      )`,
      [],
      () => console.log('Table "informasi" berhasil dibuat'),
      error => console.log('Error membuat table "informasi":', error),
    );
  });
};

// Membuat table "users"
export const createUsersTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        namalengkap TEXT NOT NULL,
        saldo REAL DEFAULT 0
      )`,
      [],
      () => console.log('Table "users" berhasil dibuat'),
      error => console.log('Error membuat table "users":', error),
    );
  });
};

// Fungsi untuk menyimpan data pengguna ke dalam tabel "users"
export const registerUser = (username, password, email, namalengkap) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (username, password, email, namalengkap) VALUES (?, ?, ?, ?)',
        [username, password, email, namalengkap],
        (_, results) => resolve(results),
        (_, error) => reject(error),
      );
    });
  });
};

// Perintah untuk verifikasi login pengguna
export const verifyLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0));
          } else {
            reject('Username atau Password salah');
          }
        },
        (_, error) => reject(error),
      );
    });
  });
};

// Mengambil semua data dari tabel "informasi"
export const getInformasi = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM informasi_0910169 ORDER BY id DESC',
        [],
        (_, { rows }) => {
          const data = rows.raw();
          resolve(data);
        },
        (_, error) => {
          console.error('Error dalam eksekusi SQL:', error);
          reject(error);
        },
      );
    });
  });
};

export const simpanInformasi = (judul, deskripsi, gambar, tanggal) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO informasi_0910169 (judul_0910169, deskripsi_0910169, gambar_0910169, tanggal_0910169) VALUES (?, ?, ?, ?)',
        [judul, deskripsi, gambar, tanggal],
        (_, results) => resolve(results),
        (_, error) => reject(error),
      );
    });
  });
};

export const getInformasiById = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM informasi_0910169 WHERE id = ?',
        [id],
        (_, { rows }) => {
          const data = rows.item(0); // Ambil data pertama
          resolve(data);
        },
        (_, error) => reject(error),
      );
    });
  });
};

export const updateInformasi = (id, judul, deskripsi, gambar, tanggal) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE informasi_0910169 SET judul_0910169 = ?, deskripsi_0910169 = ?, gambar_0910169 = ?, tanggal_0910169 = ? WHERE id = ?',
        [judul, deskripsi, gambar, tanggal, id],
        (_, results) => resolve(results),
        (_, error) => reject(error),
      );
    });
  });
};

export const updateSaldo = (id, saldo, status, jumlah) => {
  return new Promise((resolve, reject) => {
    if (status === 'masuk') {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE users_0910169 SET saldo_0910169 = saldo_0910169 + ?, deskripsi_0910169 = ?, gambar_0910169 = ?, tanggal_0910169 = ? WHERE id = ?',
          [a, b, c, d, id],
          (_, results) => resolve(results),
          (_, error) => reject(error),
        );
      });
    }
  });
};

export const deleteInformasi = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM informasi_0910169 WHERE id = ?',
        [id],
        (_, results) => resolve(results),
        (_, error) => reject(error),
      );
    });
  });
};

export default db;
