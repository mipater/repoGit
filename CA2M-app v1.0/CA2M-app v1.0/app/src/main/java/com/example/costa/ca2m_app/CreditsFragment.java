package com.example.costa.ca2m_app;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

/**
 * Created by Costa on 06/06/2017.
 */

//Definizione classe CreditsFragment
public class CreditsFragment extends Fragment {
    //Creazione di una nuova istanza di CreditsFragment
    public static CreditsFragment newInstance() {
        CreditsFragment fragment = new CreditsFragment();
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_credits, container, false);
    }
}
