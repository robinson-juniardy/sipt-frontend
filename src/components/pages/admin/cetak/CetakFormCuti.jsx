import {
  Document,
  StyleSheet,
  View,
  Text,
  Page,
  PDFViewer,
} from "@react-pdf/renderer";
import React, { useEffect, useLayoutEffect, useState } from "react";
import HttpServices from "../../../utils/HttpServices";
import dayjs from "dayjs";

function FormatNip(nip) {
  return (
    String(nip).slice(0, 8) +
    " " +
    String(nip).slice(8, 14) +
    " " +
    String(nip).slice(14, 15) +
    " " +
    String(nip).slice(15, 18)
  );
}

function getDate() {
  const Months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  var today = new Date();
  var date = today.toJSON().slice(0, 10);
  var nDate =
    date.slice(8, 10) + " " + Months[today.getMonth()] + " " + date.slice(0, 4);
  return nDate;
}

function ConvertDate(params) {
  const Months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  var today = new Date(params);
  var date = today.toJSON().slice(0, 10);
  var nDate =
    date.slice(8, 10) + " " + Months[today.getMonth()] + " " + date.slice(0, 4);
  return nDate;
}

const DataPegawaiTable = (props) => {
  const awalMasaKerja =
    "01/" +
    String(props.DataPegawai.pegawai.nip).slice(6, 8) +
    "/" +
    String(props.DataPegawai.pegawai.nip).slice(8, 12);

  const BulanMasaKerja =
    "01/" +
    String(props.DataPegawai.pegawai.nip).slice(12, 14) +
    "/" +
    new Date().getFullYear();

  const today = dayjs();

  const awalKerja = dayjs(awalMasaKerja);

  const Bulan = today.diff(BulanMasaKerja, "month");
  const Tahun = today.diff(awalKerja, "year");

  const masaKerja = Tahun + " Tahun " + Bulan + " Bulan";

  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "95%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 10,
      //   marginTop:,
      marginLeft: 20,
      //   alignItems: "center",
    },
    tableRow: {
      //   margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      //   width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      textAlign: "left",
      //   alignItems: "flex-start",
    },
    tableCell: {
      //   margin: "auto",
      marginTop: 5,
      fontSize: 11,
    },
  });

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={[styles.tableCell, { margin: 3 }]}>I. DATA PEGAWAI</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>Nama</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            {props.DataPegawai.pegawai.nama}
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>NIP</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            {FormatNip(props.DataPegawai.pegawai.nip)}
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>Jabatan</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            {props.jabatan.nama_jabatan}
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>Masa Kerja</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>{masaKerja}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>Unit Kerja</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            Dinas Komunikasi Dan Informatika Kab. Tanah Laut
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
    </View>
  );
};

const JenisCutiTable = (props) => {
  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "95%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 10,
      marginLeft: 20,
      //   alignItems: "center",
    },
    tableRow: {
      //   margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      //   width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      textAlign: "left",
      //   alignItems: "flex-start",
    },
    tableCell: {
      //   margin: "auto",
      marginTop: 5,
      fontSize: 11,
    },
  });

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={[styles.tableCell, { margin: 3 }]}>
            II. JENIS CUTI YANG DI AMBIL
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>1. Cuti Tahunan</Text>
        </View>
        <View style={[styles.tableCol, { width: "10%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "45%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>1. Cuti Besar</Text>
        </View>
        <View style={[styles.tableCol, { width: "10%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>2. Cuti Sakit</Text>
        </View>
        <View style={[styles.tableCol, { width: "10%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "45%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            2. Cuti Melahirkan
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "10%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            3. Cuti Karena Alasan Penting
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "10%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "45%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            3. Cuti Di Luar Tanggungan Negara
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "10%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
    </View>
  );
};

const AlasanCutiTable = (props) => {
  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "95%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 10,
      marginLeft: 20,
      //   alignItems: "center",
    },
    tableRow: {
      //   margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      //   width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      textAlign: "left",
      //   alignItems: "flex-start",
    },
    tableCell: {
      //   margin: "auto",
      marginTop: 5,
      fontSize: 11,
    },
  });

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={[styles.tableCell, { margin: 3 }]}>
            III. ALASAN CUTI
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            {props.DataPegawai.alasan_pengajuan_cuti}
          </Text>
        </View>
      </View>
    </View>
  );
};

const DurasiCutiTable = (props) => {
  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "95%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 10,
      marginLeft: 20,
      //   alignItems: "center",
    },
    tableRow: {
      //   margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      //   width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      textAlign: "left",
      //   alignItems: "flex-start",
    },
    tableCell: {
      //   margin: "auto",
      marginTop: 5,
      fontSize: 11,
    },
  });

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={[styles.tableCell, { margin: 3 }]}>
            IV. LAMANYA CUTI
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>Selama</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            {props.DataPegawai.durasi} Hari
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>Mulai Tanggal</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            {ConvertDate(props.DataPegawai.tgl_mulai)}
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "5%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>s/d</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            {ConvertDate(props.DataPegawai.tgl_selesai)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const CatatanCutiTable = () => {
  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "95%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 10,
      marginLeft: 20,
      //   alignItems: "center",
    },
    tableRow: {
      //   margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      //   width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      textAlign: "left",
      //   alignItems: "flex-start",
    },
    tableCell: {
      //   margin: "auto",
      marginTop: 5,
      fontSize: 11,
    },
  });

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={[styles.tableCell, { margin: 3 }]}>V. CATATAN CUTI</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "45%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>1. CUTI TAHUNAN</Text>
        </View>
        <View style={[styles.tableCol, { width: "45%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>2. CUTI BESAR</Text>
        </View>
        <View style={[styles.tableCol, { width: "10%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>Tahun</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>Sisa</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>Keterangan</Text>
        </View>
        <View style={[styles.tableCol, { width: "45%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>3. CUTI SAKIT</Text>
        </View>
        <View style={[styles.tableCol, { width: "10%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>N-2</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>-</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>-</Text>
        </View>
        <View style={[styles.tableCol, { width: "45%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            4. CUTI MELAHIRKAN
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "10%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>N-1</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>-</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>-</Text>
        </View>
        <View style={[styles.tableCol, { width: "45%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            5. CUTI KARENA ALASAN PENTING
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "10%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>N</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>-</Text>
        </View>
        <View style={[styles.tableCol, { width: "15%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>-</Text>
        </View>
        <View style={[styles.tableCol, { width: "45%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            6. CUTI DI LUAR TANGGUNGAN NEGARA
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "10%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
    </View>
  );
};

const AlamatCutiTable = (props) => {
  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "95%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 10,
      marginLeft: 20,
      //   alignItems: "center",
    },
    tableRow: {
      //   margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      //   width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      textAlign: "left",
      //   alignItems: "flex-start",
    },
    tableCell: {
      //   margin: "auto",
      marginTop: 5,
      fontSize: 11,
    },
  });

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={[styles.tableCell, { margin: 3 }]}>
            VI. ALAMAT SELAMA MENJALANKAN CUTI
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "30%", textAlign: "center" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>TELP</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            {props.DataPegawai.alamat_selama_cuti}
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "30%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "35%", textAlign: "center" }]}>
          <Text style={[styles.tableCell, { margin: 2, marginBottom: 35 }]}>
            Hormat Saya
          </Text>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            {props.DataPegawai.pegawai.nama}
          </Text>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            NIP.{FormatNip(props.DataPegawai.pegawai.nip)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const PertimbanganAtasanTable = (props) => {
  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "95%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 10,
      marginLeft: 20,
      //   alignItems: "center",
    },
    tableRow: {
      //   margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      //   width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      textAlign: "left",
      //   alignItems: "flex-start",
    },
    tableCell: {
      //   margin: "auto",
      marginTop: 5,
      fontSize: 11,
    },
  });

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={[styles.tableCell, { margin: 3 }]}>
            VII. PERTIMBANGAN ATASAN LANGSUNG
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>DISETUJUI</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>PERUBAHAN****</Text>
        </View>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            DITANGGUHKAN****
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            TIDAK DISETUJUI****
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2, padding: 6 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "35%", textAlign: "center" }]}>
          <Text style={[styles.tableCell, { margin: 2, marginBottom: 35 }]}>
            {props.JabatanAtasan.nama_jabatan}
          </Text>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            {props.atasan.nama}
          </Text>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            NIP.{FormatNip(props.atasan.nip)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const KeputusanPejabatTable = (props) => {
  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "95%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 50,
      marginLeft: 20,
      //   alignItems: "center",
    },
    tableRow: {
      //   margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      //   width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      textAlign: "left",
      //   alignItems: "flex-start",
    },
    tableCell: {
      //   margin: "auto",
      marginTop: 5,
      fontSize: 11,
    },
  });

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={[styles.tableCell, { margin: 3 }]}>
            VIII. KEPUTUSAN PEJABAT YANG BERWENANG MEMBERIKAN CUTI
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>DISETUJUI</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>PERUBAHAN****</Text>
        </View>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            DITANGGUHKAN****
          </Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            TIDAK DISETUJUI****
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2, padding: 6 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
      </View>
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}></Text>
        </View>
        <View style={[styles.tableCol, { width: "35%", textAlign: "center" }]}>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            Kepala Dinas Komunikasi dan
          </Text>
          <Text style={[styles.tableCell, { margin: 2, marginBottom: 35 }]}>
            Informatika
          </Text>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            {props.kadis.nama}
          </Text>
          <Text style={[styles.tableCell, { margin: 2 }]}>
            NIP.{FormatNip(props.kadis.nip)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Title = () => {
  const styles = StyleSheet.create({
    container: {
      // flexDirection: "row",
      marginTop: -10,
      // justifyContent: "flex-end",
      //   margin: 10,
      //   padding: 10,
      //   marginLeft: 320,
      alignItems: "center",
      flexGrow: 25,
    },
    text: {
      fontSize: 12,
      fontWeight: "extrabold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>FORMULIR PERMINTAAN DAN PEMBERIAN CUTI</Text>;
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    // backgroundColor: "#E4E4E4",
  },
  container: {
    // flexDirection: "row",
    // marginTop: 26,
    // justifyContent: "flex-end",
    margin: 10,
    padding: 10,
    marginLeft: 320,
    alignItems: "flex-start",
    flexGrow: 1,
  },
  //   section: {
  //     margin: 10,
  //     padding: 10,
  //     flexGrow: 1,
  //     alignItems: "flex-end",
  //   },
  font: {
    fontSize: 11,
    padding: 2,
  },
});

const Content = (props) => {
  console.log(props);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.font}>Pelaihari, {getDate()}</Text>
        <Text style={{ marginTop: 10, ...styles.font }}>Kepada Yth,</Text>
        <Text style={styles.font}>Bupati Tanah Laut</Text>
        <Text style={styles.font}>Kepala Dinas Komunikasi dan Informatika</Text>
        {/* <Text style={styles.font}>Kabupaten Tanah Laut</Text> */}
        <Text style={styles.font}>Di - Pelaihari</Text>
      </View>
      <Title />
      <DataPegawaiTable {...props} />
      <JenisCutiTable {...props} />
      <AlasanCutiTable {...props} />
      <DurasiCutiTable {...props} />
      <CatatanCutiTable {...props} />
      <AlamatCutiTable {...props} />
      <PertimbanganAtasanTable {...props} />
      <KeputusanPejabatTable {...props} />
    </View>
  );
};

const CetakFormCuti = (props) => {
  const [pangkat, setPangkat] = useState(null);
  const [golongan, setGolongan] = useState(null);
  const [jabatan, setJabatan] = useState(null);
  const [jabatanAtasan, setJabatanAtasan] = useState(null);
  const [atasan, setAtasan] = useState(null);
  const [kadis, setKadis] = useState(null);

  const GetMasterData = async () => {
    await HttpServices.get(
      "/master/pangkat/" + props.DataPegawai.pegawai.pangkat
    ).then((response) => {
      setPangkat(response.data);
    });
    await HttpServices.get(
      "/master/pegawai/nip/" + props.DataPegawai.pegawai.nip
    ).then((response) => {
      setAtasan(response.data.atasan);
      HttpServices.get("/master/jabatan/" + response.data.atasan.jabatan).then(
        (res) => {
          setJabatanAtasan(res.data);
        }
      );
    });
    await HttpServices.get(
      "/master/jabatan/" + props.DataPegawai.pegawai.jabatan
    ).then((response) => {
      setJabatan(response.data);
    });

    await HttpServices.get("/master/pegawai/jabatan/" + 1).then((response) => {
      setKadis(response.data);
    });

    await HttpServices.get(
      "/master/golongan/" + props.DataPegawai.pegawai.golongan
    ).then((response) => {
      console.log(response.data);
      setGolongan(response.data);
    });
  };

  useEffect(() => {
    GetMasterData();
  }, []);

  console.log(jabatanAtasan);

  return (
    <PDFViewer
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
      }}
    >
      <Document>
        <Page wrap orientation="portrait" size={"LEGAL"} style={styles.page}>
          {pangkat !== null &&
            golongan !== null &&
            jabatan !== null &&
            atasan !== null &&
            jabatanAtasan !== null && (
              <Content
                DataPegawai={props.DataPegawai}
                pangkat={pangkat}
                golongan={golongan}
                jabatan={jabatan}
                atasan={atasan}
                kadis={kadis}
                JabatanAtasan={jabatanAtasan}
              />
            )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CetakFormCuti;
