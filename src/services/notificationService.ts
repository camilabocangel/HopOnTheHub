// services/notificationService.ts
import { sendPushNotification } from "@/hooks/usePushNotifications";

export const notifyEventStatusChange = async (
  eventId: string,
  eventTitle: string,
  newStatus: string,
  creatorPushToken?: string
) => {
  try {
    if (!creatorPushToken) {
      console.log("No hay push token del creador para notificar");
      return;
    }

    let title = "";
    let body = "";

    switch (newStatus) {
      case "accepted":
        title = "¡Evento Aprobado! 🎉";
        body = `Tu evento "${eventTitle}" ha sido aprobado`;
        break;
      case "rejected":
        title = "Evento Rechazado";
        body = `Tu evento "${eventTitle}" ha sido rechazado`;
        break;
      default:
        title = "Estado de Evento Actualizado";
        body = `El estado de tu evento "${eventTitle}" ha cambiado a ${newStatus}`;
    }

    await sendPushNotification(creatorPushToken, title, body, {
      eventId,
      type: "event_status_change",
      screen: "event-details",
    });

    console.log("Notificación de cambio de estado enviada al creador");
  } catch (error) {
    console.error("Error enviando notificación de cambio de estado:", error);
  }
};

export const notifyAnnouncementStatusChange = async (
  announcementId: string,
  announcementDescription: string,
  newStatus: string,
  creatorPushToken?: string
) => {
  try {
    if (!creatorPushToken) {
      console.log("No hay push token del creador para notificar anuncio");
      return;
    }

    let title = "";
    let body = "";

    switch (newStatus) {
      case "accepted":
        title = "¡Anuncio Aprobado! 📢";
        body = `Tu anuncio "${announcementDescription}" ha sido aprobado`;
        break;
      case "rejected":
        title = "Anuncio Rechazado";
        body = `Tu anuncio "${announcementDescription}" ha sido rechazado`;
        break;
      case "hidden":
        title = "Anuncio Ocultado";
        body = `Tu anuncio "${announcementDescription}" ha sido ocultado`;
        break;
      default:
        title = "Estado de Anuncio Actualizado";
        body = `El estado de tu anuncio ha cambiado a ${newStatus}`;
    }

    await sendPushNotification(creatorPushToken, title, body, {
      announcementId,
      type: "announcement_status_change",
      screen: "announcement-details",
    });

    console.log("Notificación de cambio de estado de anuncio enviada");
  } catch (error) {
    console.error(
      "Error enviando notificación de cambio de estado de anuncio:",
      error
    );
  }
};
