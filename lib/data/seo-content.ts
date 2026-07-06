export type ContentSection = {
  title: string;
  paragraphs: string[];
  imageUrl: string;
};

export function getPlomberieContent(ville: string, codePostal: string): ContentSection[] {
  return [
    {
      title: `Dépannage plombier à ${ville} (${codePostal})`,
      paragraphs: [
        `À la recherche d'un service de dépannage plombier à ${ville} (${codePostal}) rapide et efficace ? Nos artisans interviennent en urgence, 7j/7, pour répondre à tous vos imprévus : fuite soudaine, chauffe-eau en panne, canalisation bouchée ou robinetterie défaillante. Basés au cœur de l'Hérault, nous connaissons parfaitement le bâti local de ${ville} et intervenons dans un délai moyen de 30 à 45 minutes.`,
        `Chaque intervention commence par un diagnostic précis, sans surprise sur la facture finale. Nos plombiers qualifiés disposent de tout l'outillage nécessaire pour traiter la majorité des pannes dès le premier passage, à ${ville} comme dans les communes environnantes. Urgence de jour comme de nuit, week-ends et jours fériés inclus, notre standard reste joignable pour organiser votre dépannage plombier à ${ville} (${codePostal}) dans les plus brefs délais.`,
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: `Recherche de fuite d'eau à ${ville}`,
      paragraphs: [
        `Une fuite d'eau non détectée peut rapidement causer des dégâts considérables : moisissures, affaissement de sol, surconsommation d'eau facturée à prix fort. À ${ville}, nos techniciens utilisent des méthodes de détection non destructives — caméra thermique, gaz traceur, corrélateur acoustique — pour localiser l'origine exacte de la fuite sans avoir à percer l'ensemble de vos murs ou de votre dallage.`,
        `Cette approche chirurgicale nous permet de limiter les travaux de réfection au strict minimum une fois la fuite identifiée. Que la fuite se situe sur une canalisation encastrée, sous une dalle ou au niveau d'une colonne montante, notre équipe intervenant à ${ville} vous remet un rapport détaillé et un devis clair avant toute réparation, pour une prise en charge sereine, y compris auprès de votre assurance.`,
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: `Débouchage canalisation à ${ville}`,
      paragraphs: [
        `Évier qui refoule, WC bouché, douche qui stagne : les canalisations obstruées font partie des urgences les plus fréquentes signalées par les habitants de ${ville}. Nos artisans interviennent avec un matériel professionnel — furet électrique, hydrocureur haute pression — capable de traiter aussi bien les bouchons superficiels que les engorgements profonds situés au niveau des collecteurs enterrés.`,
        `Au-delà du débouchage, nous procédons systématiquement à une inspection par caméra endoscopique pour vérifier l'état général de votre réseau et prévenir toute récidive. Racines d'arbres, dépôts de tartre, graisses accumulées : quelle que soit la cause, nos équipes locales à ${ville} rétablissent un écoulement normal rapidement, avec un nettoyage soigné des lieux après intervention.`,
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: `Installation de plomberie à ${ville}`,
      paragraphs: [
        `Rénovation de salle de bains, remplacement de chauffe-eau, création d'un point d'eau supplémentaire : nos artisans plombiers accompagnent les particuliers et professionnels de ${ville} sur l'ensemble de leurs projets d'installation, du simple remplacement de robinetterie à la réfection complète d'un réseau de plomberie.`,
        `Chaque installation est réalisée dans le respect des normes en vigueur (DTU plomberie sanitaire), avec des matériaux durables sélectionnés pour leur fiabilité à long terme. Nos équipes établissent un devis détaillé avant travaux et assurent la mise en service ainsi que les réglages nécessaires (pression, température, débit) pour un confort optimal dans votre logement à ${ville} (${codePostal}).`,
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1600",
    },
  ];
}

export function getSerrurerieContent(ville: string, codePostal: string): ContentSection[] {
  return [
    {
      title: `Dépannage serrurier à ${ville} (${codePostal})`,
      paragraphs: [
        `Porte claquée, clé cassée dans la serrure, cambriolage ou simple perte de trousseau : nos serruriers interviennent en urgence 7j/7 à ${ville} (${codePostal}) pour vous permettre de retrouver l'accès à votre domicile ou local professionnel dans les meilleurs délais, sans dégradation inutile de votre porte.`,
        `Notre connaissance du bâti local nous permet d'intervenir efficacement sur tous types de serrures et de portes, qu'il s'agisse d'un immeuble ancien du centre-ville ou d'une construction récente en périphérie de ${ville}. Un tarif est systématiquement annoncé avant intervention, sans mauvaise surprise, pour un dépannage serrurier en toute confiance.`,
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: `Ouverture de porte à ${ville}`,
      paragraphs: [
        `L'ouverture de porte sans dégât est une véritable expertise : crochetage, pose de coin, passage par la tranche ou utilisation d'une radiographie de serrure selon le modèle rencontré. Nos serruriers intervenant à ${ville} privilégient systématiquement la technique la moins invasive pour préserver votre porte et votre serrure d'origine.`,
        `Ce n'est qu'en dernier recours, lorsque le mécanisme est endommagé ou d'une conception rendant toute manipulation impossible, que nous procédons à un perçage contrôlé, immédiatement suivi du remplacement du cylindre. Dans tous les cas, un serrurier qualifié se déplace à ${ville} avec l'ensemble du matériel nécessaire pour résoudre la situation en une seule intervention.`,
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: `Porte blindée à ${ville}`,
      paragraphs: [
        `Face à la recrudescence des tentatives d'effraction, de plus en plus d'habitants de ${ville} font le choix d'une porte blindée ou d'un blindage de porte existante. Nos artisans posent des portes certifiées A2P, ainsi que des blocs-portes complets intégrant serrure multipoints, paumelles renforcées et cornières anti-pinces.`,
        `Pour les portes déjà en place, le blindage consiste à habiller la porte existante d'une tôle d'acier et à renforcer l'huisserie, sans changer l'aspect extérieur de votre entrée. Chaque projet à ${ville} fait l'objet d'une visite technique préalable afin de proposer le niveau de sécurisation le plus adapté à la configuration des lieux et à votre budget.`,
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: `Rideaux métalliques à ${ville}`,
      paragraphs: [
        `Commerces, garages, entrepôts : nos équipes installent, réparent et entretiennent les rideaux métalliques des professionnels de ${ville} et de ses environs, qu'il s'agisse de modèles manuels, à enroulement automatique ou motorisés avec télécommande.`,
        `En cas de panne — lame faussée, moteur en défaut, câble rompu ou système de verrouillage grippé — notre serrurier intervenant à ${ville} (${codePostal}) réalise un diagnostic complet avant réparation, et peut également équiper votre rideau existant d'un système de motorisation ou de verrouillage renforcé pour sécuriser durablement votre local.`,
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600",
    },
  ];
}
