<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home', locale: "en")]
    public function index(TranslatorInterface $translator): Response
    {
        return $this->render('home/home.html.twig', [
            'controller_name' => 'HomeController',
            'css_version' => uniqid('version'),
            'translator'=> $translator,
            'locate' => 'en',
        ]);
    }

    #[Route('/en', name: 'app_home_en', locale: "en")]
    public function indexEN(TranslatorInterface $translator): Response
    {
        return $this->render('home/home.html.twig', [
            'controller_name' => 'HomeController',
            'css_version' => uniqid('version'),
            'translator'=> $translator,
            'locate' => 'en',
        ]);
    }

    #[Route('/pa', name: 'app_home_pa', locale: "pa")]
    public function indexPA(TranslatorInterface $translator): Response
    {
        return $this->render('home/home.html.twig', [
            'controller_name' => 'HomeController',
            'css_version' => uniqid('version'),
            'translator'=> $translator,
            'locate' => 'pa',
        ]);
    }
}
