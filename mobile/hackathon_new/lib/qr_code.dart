import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:hackathon_new/globals.dart'; 
import 'package:qr_flutter/qr_flutter.dart';

class QRCodeGeneratorPage extends StatefulWidget {
  const QRCodeGeneratorPage({super.key});

  @override
  _QRCodeGeneratorPageState createState() => _QRCodeGeneratorPageState();
}

class _QRCodeGeneratorPageState extends State<QRCodeGeneratorPage> {
  String? qrData;

  @override
  void initState() {
    super.initState();
    qrData = token; 
  }

  @override
  Widget build(BuildContext context) {
    final double screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Spacing at the top
                SizedBox(height: screenHeight * 0.1),
                // Logo
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                  ),
                  child: SizedBox(
                    height: 60,
                    child: Image.asset('assets/images/nexhrd.png'),
                  ),
                ),
                const SizedBox(height: 20),
                // Title text
                const Text(
                  'Generate QR Code',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: Colors.blue,
                  ),
                ),
                const SizedBox(height: 8),
                // Subtitle text
                const Text(
                  'Your token is displayed as a QR Code',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey,
                  ),
                ),
                const SizedBox(height: 30),

                // QR Code Display
                if (qrData != null && qrData!.isNotEmpty)
                  QrImageView(
                    data: qrData!,
                    version: QrVersions.auto,
                    size: 250.0,
                  )
                else
                  const Text(
                    'No token available to generate QR Code.',
                    style: TextStyle(color: Colors.red),
                  ),
                SizedBox(height: screenHeight * 0.2),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
