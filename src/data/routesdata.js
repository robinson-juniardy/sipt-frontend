import HomePage from "../components/pages/home/HomePage";
import PelayananPage from "../components/pages/pelayanan/PelayananPage";
import CutiAlasanPenting from "../components/pages/pelayanan/cuti_alasan_penting/CutiAlasanPenting";
import CutiTahunan from "../components/pages/pelayanan/cuti_tahunan/CutiTahunan";
import CutiMelahirkan from "../components/pages/pelayanan/cuti_melahirkan/CutiMelahirkan";
import InformasiPage from "../components/pages/informasi/InformasiPage";
import Ekita from "../components/pages/informasi/ekita/Ekita";
import Kepegawaian from "../components/pages/informasi/kepegawaian/Kepegawaian";
import { MainLayout } from "../layout/MainLayout";
import LoginLayout from "../layout/LoginLayout";
import LoginPage from "../components/pages/users/LoginPage";
import ProtectedRoutes from "../ProtectedRoutes";
import SplashScreen from "../SplashScreen";
import PublicRoutes from "../PublicRoutes";
import AdminHomePage from "../components/pages/admin/home/AdminHomePage";
import AdminKepegawaian from "../components/pages/admin/master/kepegawaian/Kepegawaian";
import KasubbagHomePage from "../components/pages/kassubag/home/KasubbagHomePage";
import HistoryPage from "../components/pages/pelayanan/history/HistoryPage";
import SekretarisHomePage from "../components/pages/sekretaris/home/SekretarisHomePage";
import KadisHomePage from "../components/pages/kadis/home/KadisHomePage";

export const public_routes = [
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        name: "Login",
        path: "",
        element: <LoginPage />,
      },
    ],
  },
];

const admin_routes = [
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        name: "Home",
        path: "home",
        element: <AdminHomePage />,
      },
      {
        name: "Kepegawaian",
        path: "kepegawaian",
        element: <AdminKepegawaian />,
      },
    ],
  },
];

const kasubbag_routes = [
  {
    path: "/kasubbag",
    element: <MainLayout />,
    children: [
      {
        name: "Home",
        path: "home",
        element: <KasubbagHomePage />,
      },
      {
        name: "Kepegawaian",
        path: "kepegawaian",
        element: <Kepegawaian />,
      },
      {
        name: "Pelayanan",
        path: "pelayanan",
        exact: true,
        element: <PelayananPage />,
        children: [
          {
            name: "Cuti Tahunan",
            path: "cuti-tahunan",
            element: <CutiTahunan />,
          },
          {
            name: "Cuti Alasan Penting",
            path: "cuti-alasan-penting",
            element: <CutiAlasanPenting />,
          },
          {
            name: "Cuti Melahirkan",
            path: "cuti-melahirkan",
            element: <CutiMelahirkan />,
          },
        ],
      },
      {
        name: "Informasi",
        path: "informasi",
        element: <InformasiPage />,
        children: [
          {
            name: "Ekita Bulanan",
            path: "pelayanan/ekita-bulanan",
            element: <Ekita />,
          },
          {
            name: "Data Kepegawaian",
            path: "pelayanan/data-kepegawaian",
            element: <Kepegawaian />,
          },
        ],
      },
    ],
  },
];

const kadis_route = [
  {
    path: "/kadis",
    element: <MainLayout />,
    children: [
      {
        name: "Home",
        path: "home",
        element: <KadisHomePage />,
      },
      {
        name: "Kepegawaian",
        path: "kepegawaian",
        element: <Kepegawaian />,
      },
      {
        name: "Pelayanan",
        path: "pelayanan",
        exact: true,
        element: <PelayananPage />,
        children: [
          {
            name: "Cuti Tahunan",
            path: "cuti-tahunan",
            element: <CutiTahunan />,
          },
          {
            name: "Cuti Alasan Penting",
            path: "cuti-alasan-penting",
            element: <CutiAlasanPenting />,
          },
          {
            name: "Cuti Melahirkan",
            path: "cuti-melahirkan",
            element: <CutiMelahirkan />,
          },
        ],
      },
      {
        name: "Informasi",
        path: "informasi",
        element: <InformasiPage />,
        children: [
          {
            name: "Ekita Bulanan",
            path: "pelayanan/ekita-bulanan",
            element: <Ekita />,
          },
          {
            name: "Data Kepegawaian",
            path: "pelayanan/data-kepegawaian",
            element: <Kepegawaian />,
          },
        ],
      },
    ],
  },
];

const sekretaris_route = [
  {
    path: "/sekretaris",
    element: <MainLayout />,
    children: [
      {
        name: "Home",
        path: "home",
        element: <SekretarisHomePage />,
      },
      {
        name: "Kepegawaian",
        path: "kepegawaian",
        element: <Kepegawaian />,
      },
      {
        name: "Pelayanan",
        path: "pelayanan",
        exact: true,
        element: <PelayananPage />,
        children: [
          {
            name: "Cuti Tahunan",
            path: "cuti-tahunan",
            element: <CutiTahunan />,
          },
          {
            name: "Cuti Alasan Penting",
            path: "cuti-alasan-penting",
            element: <CutiAlasanPenting />,
          },
          {
            name: "Cuti Melahirkan",
            path: "cuti-melahirkan",
            element: <CutiMelahirkan />,
          },
        ],
      },
      {
        name: "Informasi",
        path: "informasi",
        element: <InformasiPage />,
        children: [
          {
            name: "Ekita Bulanan",
            path: "pelayanan/ekita-bulanan",
            element: <Ekita />,
          },
          {
            name: "Data Kepegawaian",
            path: "pelayanan/data-kepegawaian",
            element: <Kepegawaian />,
          },
        ],
      },
    ],
  },
];

const pns_route = [
  {
    path: "/pns",
    element: <MainLayout />,
    children: [
      {
        name: "Home",
        path: "home",
        element: <HomePage />,
      },
      {
        name: "Kepegawaian",
        path: "kepegawaian",
        element: <Kepegawaian />,
      },
      {
        name: "Pelayanan",
        path: "pelayanan",
        exact: true,
        element: <PelayananPage />,
        children: [
          {
            name: "Cuti Tahunan",
            path: "cuti-tahunan",
            element: <CutiTahunan />,
          },
          {
            name: "Cuti Alasan Penting",
            path: "cuti-alasan-penting",
            element: <CutiAlasanPenting />,
          },
          {
            name: "Cuti Melahirkan",
            path: "cuti-melahirkan",
            element: <CutiMelahirkan />,
          },
          {
            name: "History",
            path: "history-pengajuan-cuti",
            element: <HistoryPage />,
          },
        ],
      },
      {
        name: "Informasi",
        path: "informasi",
        element: <InformasiPage />,
        children: [
          {
            name: "Ekita Bulanan",
            path: "ekita-bulanan",
            element: <Ekita />,
          },
          {
            name: "Data Kepegawaian",
            path: "data-kepegawaian",
            element: <Kepegawaian />,
          },
        ],
      },
    ],
  },
];

export const routes = [
  ...public_routes,
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/welcome",
        element: <SplashScreen />,
      },
      ...admin_routes,
      ...pns_route,
      ...kasubbag_routes,
      ...sekretaris_route,
      ...kadis_route,
    ],
  },
];
