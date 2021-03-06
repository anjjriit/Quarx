<?php

class EventsTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();
        $this->withoutMiddleware();
        $this->withoutEvents();
        factory(\Yab\Quarx\Models\Event::class)->create();
    }

    /*
    |--------------------------------------------------------------------------
    | Views
    |--------------------------------------------------------------------------
    */

    public function testIndex()
    {
        $response = $this->call('GET', 'quarx/events');
        $this->assertEquals(200, $response->getStatusCode());
        $response->assertViewHas('events');
    }

    public function testCreate()
    {
        $response = $this->call('GET', 'quarx/events/create');
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function testEdit()
    {
        $response = $this->call('GET', 'quarx/events/1/edit');
        $this->assertEquals(200, $response->getStatusCode());
        $response->assertViewHas('event');
    }

    /*
    |--------------------------------------------------------------------------
    | Actions
    |--------------------------------------------------------------------------
    */

    public function testStore()
    {
        $events = factory(\Yab\Quarx\Models\Event::class)->make(['id' => 2]);
        $response = $this->call('POST', 'quarx/events', $events['attributes']);

        $this->assertEquals(302, $response->getStatusCode());
    }

    public function testSearch()
    {
        $response = $this->call('POST', 'quarx/events/search', ['term' => 'wtf']);

        $response->assertViewHas('events');
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function testUpdate()
    {
        $page = ['id' => 2, 'title' => 'dumber', 'start_date' => '2016-10-31', 'end_date' => '2016-10-31', 'details' => 'okie dokie'];
        $response = $this->call('POST', 'quarx/events', $page);

        $response = $this->call('PATCH', 'quarx/events/2', [
            'title' => 'smarter',
        ]);

        $this->assertEquals(302, $response->getStatusCode());
        $this->assertDatabaseHas('events', ['title' => 'smarter']);
    }

    public function testUpdateTranslation()
    {
        $page = ['id' => 2, 'title' => 'dumber', 'start_date' => '2016-10-31', 'end_date' => '2016-10-31', 'details' => 'okie dokie'];
        $response = $this->call('POST', 'quarx/events', $page);

        $response = $this->call('PATCH', 'quarx/events/2', [
            'title' => 'smarter',
            'lang' => 'fr',
        ]);

        $this->assertDatabaseHas('translations', [
            'entity_type' => 'Yab\\Quarx\\Models\\Event',
        ]);
        $this->assertEquals(302, $response->getStatusCode());
    }

    public function testDelete()
    {
        $response = $this->call('DELETE', 'quarx/events/1');
        $this->assertEquals(302, $response->getStatusCode());
        $response->assertRedirect('quarx/events');
    }
}
