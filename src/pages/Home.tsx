import React, { useState, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { CameraSource, CameraResultType, CameraPhoto, CameraOptions } from '@capacitor/camera';

const { Camera, Flashlight } = Plugins;

const Home: React.FC = () => {
  const [capturedPhoto, setCapturedPhoto] = useState<string | undefined>();
  const [flashOn, setFlashOn] = useState(false);

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 90
      });

      setCapturedPhoto(photo.dataUrl);
    } catch (error) {
      console.error('Erro ao capturar foto:', error);
    }
  };

  const toggleFlash = async () => {
    try {
      if (flashOn) {
        await Flashlight.turnOff();
      } else {
        await Flashlight.turnOn();
      }
      setFlashOn(!flashOn);
    } catch (error) {
      console.error('Erro ao alternar o flash:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Flash Camera App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonButton expand="block" onClick={toggleFlash} color={flashOn ? 'warning' : 'primary'}>
          {flashOn ? 'Desligar Flash' : 'Ligar Flash'}
        </IonButton>
        <IonButton expand="block" onClick={takePhoto} disabled={flashOn}>
          Tirar Foto
        </IonButton>
        {capturedPhoto && (
          <div style={{ backgroundImage: `url(${capturedPhoto})`, backgroundSize: 'cover', height: '100vh' }}></div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;