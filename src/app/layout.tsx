"use client";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./redux-store/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Đặt Tour với K&T Travel</title>

        <link rel="shortcut icon" type="image/x-icon" href="/images/logo/Logo1.png" />

        <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" />

        <link href="/css/style.css" rel="stylesheet" type="text/css" />

        <link href="/css/plugin.css" rel="stylesheet" type="text/css" />

        <link href="/css/style1.css" rel="stylesheet" type="text/css" />
        <link href="/css/style2.css" rel="stylesheet" type="text/css" />
        <link href="/css/style3.css" rel="stylesheet" type="text/css" />
        <link href="/css/style4.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
        <link rel="stylesheet" href="https://htmldesigntemplates.com/html/travelin/fonts/line-icons.css" type="text/css" />
      </head>
      <Provider store={store}>
        <EdgeStoreProvider>
          <ThemeProvider theme={baselightTheme}>
            <body>{children}</body>
          </ThemeProvider>
        </EdgeStoreProvider>
      </Provider>
    </html >
  );
}
