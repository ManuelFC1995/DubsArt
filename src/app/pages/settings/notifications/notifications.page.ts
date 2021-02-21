import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  pages = [
    {
      id: 'messages_title',
      pages: [
        { id: 'Mensajes privados', icon: 'chatbubble', color: 'medium', link: 'private-messages' },
        { id: 'Mensajes de grupo', icon: 'people', color: 'medium', link: 'group-chats' },
        { id: 'Mensajes de la comunidad DubsArt', icon: 'chatbubbles', color: 'warning', link: 'community-messages' }
      ]
    },
    {
      id: 'Mi clan',
      pages: [
        { id: 'Encargos del clan', icon: 'person', color: 'primary', link: 'communities-notifications' }
      ]
    },
    {
      id: 'feedback',
      pages: [
        { id: 'likes', icon: 'heart', color: 'danger', link: 'likes' },
       
        { id: 'comentarios', icon: 'chatbox', color: 'success', link: 'comments' },
      
        { id: 'Estadisticas de tus publicaciones', icon: 'at', color: 'primary', link: 'mentions' },
 
        { id: 'Doblajes en los que participas', icon: 'pencil', color: 'primary', link: 'posts' },

      ]
    },
    {
      id: 'eventos',
      pages: [
        { id: 'Solicitudes de amistad', icon: 'add', color: 'primary', link: 'friend-requests' },
        { id: 'personas que quizas conozcas', icon: 'person', color: 'primary', link: 'people-you-may-know' },
        { id: 'Invitaciones a clan', icon: 'mail', color: 'primary', link: 'community-invitations' },
  
        { id: 'eventos de la comunidad dubsart', icon: 'calendar', color: 'danger', link: 'upcoming-events' },

      ]
    },
    {
      id: 'other',
      pages: [
     
        { id: 'Eldoblaje.com', icon: 'podium', color: 'dark', link: 'closed-community-posts' },
     
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
