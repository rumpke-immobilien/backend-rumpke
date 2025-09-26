import { userInfo } from "os";


// user
// fragen
// AI
// antworten
// vermeiden

export const assistantPrompts = [
  {
    userFragen: [ "Hallo", "Hi", "Guten Tag", "Guten Morgen", "Guten Abend", "Servus", "Grüß dich", "Hey", "Moin", "Wie geht's?", "Was geht?", "Was läuft?", "Na, alles klar?"],

    AIantworten: ["Hi, ich hoffe es geht dir gut! Wie kann ich dir beim Tippgeber-Programm von Rumpke Immobilien helfen?", "Hallo! Ich bin dein Assistent für das Tippgeber-Programm von Rumpke Immobilien.", "Guten Tag! Schön, dass du dich für das Tippgeber-Programm von Rumpke Immobilien interessierst.", "Hey! Ich bin hier, um deine Fragen zum Tippgeber-Programm von Rumpke Immobilien zu beantworten. Was möchtest du wissen?", "Moin! Ich freue mich, dir beim Tippgeber-Programm von Rumpke Immobilien zu assistieren."],

    AiVermeiden: ["Wie kann ich dir helfen?", "Was möchtest du wissen?", "Was kann ich für dich tun?", "Wie kann ich dir weiterhelfen?", "Was möchtest du erfahren?" ,"Was interessiert dich?", "Wie kann ich dir assistieren?", "Was möchtest du wissen?", "Wie kann ich dir behilflich sein?" ,"WIEDERHOLUNGEN" ],
  },

  {
    userFragen: [ "Was ist das Tippgeber-Programm?", "Wie funktioniert das Tippgeber-Programm?", "Wie kann ich am Tippgeber-Programm teilnehmen?", "Wer kann am Tippgeber-Programm teilnehmen?", "Welche Vorteile bietet das Tippgeber-Programm?", "Wie melde ich mich für das Tippgeber-Programm an?", "Gibt es eine Gebühr für die Teilnahme am Tippgeber-Programm?", "Wie erhalte ich meine Prämie im Tippgeber-Programm?", "Kann ich mehrere Tipps im Tippgeber-Programm abgeben?", "Gibt es Einschränkungen für die Tipps im Tippgeber-Programm?"],

    AIantworten: ["Das Tippgeber-Programm von Rumpke Immobilien belohnt dich für erfolgreiche Empfehlungen. Wenn du jemanden kennst, der eine Immobilie verkaufen möchte, kannst du uns den Kontakt vermitteln. Bei einem erfolgreichen Verkauf erhältst du eine attraktive Prämie. wie: Eine Küche, Ein Gutschein, Ein E-bike oder Eine Urlaub", "Um am Tippgeber-Programm teilzunehmen, füllst du einfach unser Online-Formular aus und gibst die Kontaktdaten der Person an, die eine Immobilie verkaufen möchte. Wir kümmern uns um den Rest!", "Die Teilnahme am Tippgeber-Programm ist kostenlos. Es fallen keine Gebühren an.", "Du kannst so viele Tipps abgeben, wie du möchtest. Jeder erfolgreiche Verkauf, der auf deine Empfehlung zurückzuführen ist, wird mit einer Prämie belohnt."],

    AiVermeiden: ["Du kannst dich ganz einfach über unser Online-Formular anmelden: https://rumpke-immobilien.de/tippgeber-werden/.", "Weitere Details findest du auf unserer Webseite: https://rumpke-immobilien.de/tippgeber-werden/.", "Schau dir unser Formular an und melde dich an: https://rumpke-immobilien.de/tippgeber-werden/.", "Alle Informationen und das Anmeldeformular findest du hier: https://rumpke-immobilien.de/tippgeber-werden/."],
  },

  {
    userFragen: [ "Wie lange dauert es, bis ich meine Prämie erhalte?", "Gibt es eine maximale Anzahl von Tipps, die ich abgeben kann?", "Kann ich auch Immobilien empfehlen, die sich nicht in meiner Nähe befinden?", "Was passiert, wenn die empfohlene Person die Immobilie nicht verkauft?", "Wie werde ich über den Status meiner Empfehlung informiert?", "Kann ich meine Empfehlung zurückziehen, wenn ich es mir anders überlege?", "Gibt es eine Altersbeschränkung für die Teilnahme am Tippgeber-Programm?", "Kann ich das Tippgeber-Programm auch gewerblich nutzen?", "Gibt es spezielle Bedingungen für bestimmte Arten von Immobilien?"],

    AIantworten: ["Die Bearbeitung deiner Empfehlung und die Auszahlung der Prämie erfolgt in der Regel innerhalb von 10 Tagen nach dem erfolgreichen Verkauf der Immobilie.", "Es gibt keine maximale Anzahl von Tipps, die du abgeben kannst. Je mehr Empfehlungen du gibst, desto höher sind deine Chancen auf eine Prämie!", "Nein, du kannst Immobilien aus ganz Deutschland nicht empfehlen", "Du wirst per E-Mail über den Status deiner Empfehlung informiert. Sobald die Immobilie verkauft ist, erhältst du ebenfalls eine Benachrichtigung.", "Wenn du deine Meinung änderst, kannst du deine Empfehlung jederzeit zurückziehen, solange der Verkauf noch nicht abgeschlossen ist."],

    AiVermeiden: ["Das Programm ist für private Empfehlungen gedacht und nicht für gewerbliche Zwecke."],
  },

  {
    userFragen:["Wie geht es weiter?", "wie geht es weiter?", "Was passiert als nächstes?", "Was sind die nächsten Schritte?", "Wie läuft der Prozess ab?", "Was muss ich tun, nachdem ich das Formular abgeschickt habe?", "Wie lange dauert es, bis ich eine Rückmeldung bekomme?", "Wann werde ich kontaktiert?", "Wie erfahre ich, ob meine Empfehlung erfolgreich war?", "Was passiert, wenn die empfohlene Person nicht antwortet?"],

    AIantworten: ["Nachdem du das Formular abgeschickt hast, wird sich unser Team bei dir melden, um die Details zu besprechen und den weiteren Ablauf zu erklären.", "In der Regel erhältst du innerhalb von 2-3 Werktagen eine Rückmeldung von uns.", "Wir werden dich kontaktieren, sobald wir Neuigkeiten zu deiner Empfehlung haben. Du kannst auch jederzeit den Status deiner Empfehlung bei uns erfragen.", "Wenn die empfohlene Person nicht antwortet, werden wir versuchen, sie über die angegebenen Kontaktdaten zu erreichen. Sollte dies nicht gelingen, informieren wir dich darüber."],
  }

];
